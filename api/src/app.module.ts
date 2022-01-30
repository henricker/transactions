import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountsModule } from './apps/accounts/accounts.module';
import { OrdersModule } from './apps/orders/orders.module';
import { DatabaseConfigModule } from './config/database/database.module';
import { PostgresProviderModule } from './providers/database/postgres/postgres-provider.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseConfigModule,
    PostgresProviderModule,
    OrdersModule,
    AccountsModule,
  ],
})
export class AppModule {}
