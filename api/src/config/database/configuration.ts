import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  db: process.env.DATABASE_NAME,
}));
