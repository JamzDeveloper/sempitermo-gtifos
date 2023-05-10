import { SetMetadata } from '@nestjs/common';

export const ALLOWED_KEY = 'isPublic';
export const AllowedUser = () => SetMetadata(ALLOWED_KEY, true);
