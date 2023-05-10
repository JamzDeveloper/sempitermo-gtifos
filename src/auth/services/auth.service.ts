import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/backoffice/user/entities/user.entity';
import { LoginUserDto } from '../dtos';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true, state: true },
    });
    if (!user)
      throw new UnauthorizedException('Credetials are not valid (email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credetials are not valid (password)');

    const payload = { id: user.id };
    delete user.password;
    delete user.rol;
    return {
      user,
      ...this.generateTokens(payload),
    };
  }

  async refreshToken(refresh: string) {
    const validate: JwtPayload = await this.jwtService.verify(refresh, {
      secret: process.env.REFRESH_SECRET,
    });

    if (!validate) throw new Error('refresh token expires');

    const { id } = validate;

    return this.generateTokens({
      id,
    });
  }
  z;
  private generateTokens(payload: JwtPayload) {
    return {
      access_token: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.REFRESH_SECRET,
        expiresIn: process.env.REFRESH_EXPIRES_IN,
      }),
    };
  }
}
