import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Headers,
  BadRequestException,
} from '@nestjs/common';

import { LoginUserDto } from '../dtos';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../../modules/backoffice/user/entities/user.entity';
import { AuthService } from '../services/auth.service';
import { AllowedUser } from '../decorators/allowed.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Post('login')
  @AllowedUser()
  LoginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authServices.login(loginUserDto);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @AllowedUser()
  async refreshToken(@Headers('refresh') refreshToken: string) {
    try {
      return await this.authServices.refreshToken(refreshToken);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('private')
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
