import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../../../auth/decorators/get-user.decorator';
import { User } from '../entities/user.entity';
import { AllowedUser } from 'src/auth/decorators/allowed.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @AllowedUser()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Get('private')
  @UseGuards(AuthGuard())
  testinPrivateRouter(
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
  ) {
    return {
      message: 'You are in a private route',
      data: { name: 'Jhon', lastname: 'Doe', age: 30 },
      user,
      userEmail,
    };
  }
}
