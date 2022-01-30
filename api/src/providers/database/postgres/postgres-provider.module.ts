import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigModule } from 'src/config/database/database.module';
import { DatabaseConfigService } from 'src/config/database/database.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useFactory: async (databaseConfig: DatabaseConfigService) => ({
        type: 'sqlite',
        database: databaseConfig.databaseName,
        entities: [databaseConfig.entities],
      }),
      inject: [DatabaseConfigService],
    }),
  ],
})
export class PostgresProviderModule {}
