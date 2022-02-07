import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDTO } from "src/common/dto/auth/login.dto";
import { HashHelper } from "src/common/helpers/hash.helper";
import { Account } from "src/entities/accounts/account.entity";
import { AccountRepository } from "src/entities/accounts/account.repository";


@Injectable()
export class AuthService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.accountRepository.findOne({
      where: {
        email
      }
    });

    if (user && HashHelper.checkHashValue(user.password, password)) {
      return user;
    }

    throw new NotFoundException('Email or password is invalid');
  }

  async login(dto: LoginDTO) {
    this.validateUser(dto.email, dto.password);
    const account = await this.accountRepository.findOne({ email: dto.email })
    return this.createToken(account)
  }

  createToken(account: Account) {
    return {
      id: account.id,
      email: account.email,
      token: this.jwtService.sign({ ...account, password: undefined })
    }
  }
}