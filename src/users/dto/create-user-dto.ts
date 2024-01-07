import { IsEmail, MinLength } from 'class-validator';
export class CreateUserDto {
  @MinLength(3, { message: 'User name minimum characters count is 3' })
  name: string;

  @MinLength(6, { message: 'User surname minimum characters count is 6' })
  surname: string;

  @IsEmail()
  email: string;

  @MinLength(6, { message: 'Password minimum characters count is 6' })
  password: string;
}
