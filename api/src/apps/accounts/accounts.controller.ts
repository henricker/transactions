import { Body, Controller, Post } from '@nestjs/common';
import { CreateAccountDTO } from 'src/common/dto/accounts/create-account.dto';
import { AccountsService } from './accounts.service';

@Controller('account')
export class AccountsController {

  constructor(
    private readonly accountService: AccountsService 
  ) {}

  @Post('create')
  create(
    @Body() dto: CreateAccountDTO
  ) {
    return this.accountService.create(dto)
  }

}
