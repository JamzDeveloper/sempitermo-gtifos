import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
dotenv.config();
export default registerAs('jwtConfig', () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
}));
