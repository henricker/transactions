import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService {
  constructor(private readonly configService: ConfigService) {}

  private get isTestEnvironment(): boolean {
    return this.configService.get<boolean>('TEST');
  }

  get databaseName(): string {
    return 'orders.db';
  }

  get entities(): string {
    if (this.isTestEnvironment) {
      return 'src/**/*.entity{.ts,.js}';
    }

    return 'dist/**/*.entity{.ts,.js}';
  }

  get migrations(): string {
    if (this.isTestEnvironment) {
      return 'src/migrations/*.ts';
    }
    return 'dist/src/migrations/*.js';
  }
}
