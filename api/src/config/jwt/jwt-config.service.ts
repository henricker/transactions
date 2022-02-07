import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtConfigService {
  constructor(private readonly configService: ConfigService) {}

  get secret(): string {
    return this.configService.get<string>('jwt.secret');
  }

  get tokenExpiration(): string {
    return this.configService.get<string>('jwt.expiration');
  }

  get refreshExpiration(): string {
    return this.configService.get<string>('jwt.refreshExpiration');
  }
}