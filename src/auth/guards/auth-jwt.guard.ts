import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { ALLOWED_KEY } from '../decorators/allowed.decorator';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from '../../modules/user/entities/user.entity';
// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthJwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const allowed = this.reflector.getAllAndOverride<boolean>(ALLOWED_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (allowed) {
      return true;
    }

    return super.canActivate(context);
  }
}
