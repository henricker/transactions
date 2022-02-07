import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccountDTO } from 'src/common/dto/accounts/create-account.dto';
import { HashHelper } from 'src/common/helpers/hash.helper';
import { AccountRepository } from 'src/entities/accounts/account.repository';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AccountsService {

  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly authService: AuthService
  ) {}

  async create(dto: CreateAccountDTO) {
    const emailAlreadyExists = await this.accountRepository.findOne({ where: { email: dto.email } });

    if (emailAlreadyExists) {
      throw new BadRequestException('Email already exists')
    }

    const account = await this.accountRepository.save({ ...dto, password: HashHelper.hashValue(dto.password) })
    delete account.password

    return this.authService.createToken(account);
  }

}
