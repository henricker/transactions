import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration';
import { DatabaseConfigService } from './database.service';

@Module({
  providers: [DatabaseConfigService, ConfigService],
  exports: [ConfigService, DatabaseConfigService],
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
})
export class DatabaseConfigModule {}
