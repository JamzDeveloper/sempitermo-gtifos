import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './services/auth.service';
import { LocalStrategy } from './estrategies/local.strategy';
import { User } from '../modules/backoffice/user/entities/user.entity';
import jwtConfig from '../config/jwt.config';
import { JwtStrategy } from './estrategies/jwt-strategy';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigType<typeof jwtConfig>) => {
        return {
          secret: config.secret,
          signOptions: {
            expiresIn: config.expiresIn,
          },
        };
      },
      inject: [jwtConfig.KEY],
    }),
  ],

  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
