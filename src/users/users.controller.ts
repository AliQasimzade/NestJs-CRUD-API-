import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  ValidationPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }
  @Get('profile')
  getuserProfile(@Request() req) {
    return req.user;
  }

  @Patch(':id')
  updateUserById(@Body() updateuserDto: UpdateUserDto, @Request() req) {
    return this.userService.updateUser(req, updateuserDto);
  }

  @Delete(':id')
  deleteUserById(@Request() req) {
    return this.userService.deleteUser(req);
  }
}
