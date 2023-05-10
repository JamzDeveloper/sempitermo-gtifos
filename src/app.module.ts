import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/backoffice/user/user.module';
import { AuthModule } from './auth/auth.module';
import envsConfig from './config/envs.config';
import mainConfig from './config/config';
import jwtConfig from './config/jwt.config';
import { DatabaseModule } from './database/database.module';
import { ProviderModule } from './modules/backoffice/provider/provider.module';
import { ProviderTypeModule } from './modules/backoffice/provider-type/provider-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envsConfig[process.env.NODE_ENV] || '.env.dev',
      load: [mainConfig, , jwtConfig],
      isGlobal: true,
    }),
    DatabaseModule,

    UserModule,
    AuthModule,
    ProviderModule,
    ProviderTypeModule,
  ],
})
export class AppModule {}
