import { EntityRepository, Repository } from 'typeorm';
import { Account } from './account.entity';

@EntityRepository(Account) 
export class AccountRepository extends Repository<Account> {}
