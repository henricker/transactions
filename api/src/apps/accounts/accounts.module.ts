import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepository } from 'src/entities/accounts/account.repository';
import { AuthModule } from '../auth/auth.module';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';

@Module({
  providers: [AccountsService],
  controllers: [AccountsController],
  imports: [
    TypeOrmModule.forFeature([AccountRepository]),
    AuthModule
  ]
})
export class AccountsModule {}
