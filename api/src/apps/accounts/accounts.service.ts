import { Injectable } from '@nestjs/common';
import { CreateAccountDTO } from 'src/common/dto/accounts/create-account.dto';
import { AccountRepository } from 'src/entities/accounts/account.repository';

@Injectable()
export class AccountsService {

  constructor(
    private readonly accountRepository: AccountRepository
  ) {}

  create(dto: CreateAccountDTO) {
    return this.accountRepository.save({ ...dto })
  }

}
