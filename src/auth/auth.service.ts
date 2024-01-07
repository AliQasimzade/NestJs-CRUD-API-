import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user-dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Users.name) private userModel: Model<Users>,
  ) {}

  async signIn(email: string, pass: string) {
    try {
      const user = await this.userModel.findOne({ email });

      if (user) {
        const isMatchByPassword = await bcrypt.compare(pass, user.password);

        if (!isMatchByPassword) {
          throw new BadRequestException('Password is incorrect', {
            cause: new Error(),
            description: 'Error desc',
          });
        } else {
          const payload = {
            sub: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            phone: user.phone,
          };
          return {
            access_token: await this.jwtService.signAsync(payload),
          };
        }
      } else {
        throw new BadRequestException('This no such user', {
          cause: new Error(),
        });
      }
    } catch (error) {
      return error.response;
    }
  }

  async createUser(reqBody: CreateUserDto): Promise<any> {
    const { password } = reqBody;
    const saltOrRounds = 10;

    const hashPassword = await bcrypt.hash(password, saltOrRounds);
    const createdUser = new this.userModel({
      ...reqBody,
      password: hashPassword,
    });

    createdUser.save();
    return { message: 'User created is successfully', status: true };
  }
}
