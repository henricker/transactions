import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountsModule } from './apps/accounts/accounts.module';
import { AuthModule } from './apps/auth/auth.module';
import { OrdersModule } from './apps/orders/orders.module';
import { DatabaseConfigModule } from './config/database/database.module';
import { JwtConfigModule } from './config/jwt/jwt-config.module';
import { KafkaModule } from './providers/broker/kafka/kafka.module';
import { PostgresProviderModule } from './providers/database/postgres/postgres-provider.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseConfigModule,
    JwtConfigModule,
    PostgresProviderModule,
    OrdersModule,
    AccountsModule,
    AuthModule,
    KafkaModule
  ],
})
export class AppModule {}
