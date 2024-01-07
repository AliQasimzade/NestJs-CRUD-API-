import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private userModel: Model<Users>) {}

  async getAllUsers(): Promise<CreateUserDto[]> {
    return await this.userModel.find({}, { password: 0 });
  }

  async updateUser(req: any, reqBody: UpdateUserDto): Promise<any> {
    try {
      const { id } = req.params;

      const findUserByIdAndCheck = await this.userModel.findById({ _id: id });

      if (!findUserByIdAndCheck)
        throw new BadRequestException('No such user', { cause: new Error() });
      else {
        await this.userModel.findByIdAndUpdate(
          { _id: id },
          { $set: { ...reqBody } },
          { returnOriginal: false },
        );
        return { message: 'User is successfully updated', status: true };
      }
    } catch (error) {
      return error.response;
    }
  }

  async deleteUser(req: any): Promise<any> {
    try {
      const { id } = req.params;

      const checkUserById = await this.userModel.findById({ _id: id });

      if (!checkUserById) {
        throw new BadRequestException('No such user', {
          cause: new Error(),
          description: 'Some error description',
        });
      } else {
        await this.userModel.deleteOne({ _id: id });
        return { message: `User: ${id} is deleted succcessfully` };
      }
    } catch (error) {
      return error.response;
    }
  }
}
