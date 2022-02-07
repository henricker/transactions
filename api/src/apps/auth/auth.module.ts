import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtConfigModule } from "src/config/jwt/jwt-config.module";
import { JwtConfigService } from "src/config/jwt/jwt-config.service";
import { AccountRepository } from "src/entities/accounts/account.repository";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  providers: [AuthService, JwtStrategy, JwtConfigService],
  controllers: [AuthController],
  imports: [
    JwtConfigModule,
    ConfigModule,
    PassportModule,
    TypeOrmModule.forFeature([AccountRepository]),
    JwtModule.registerAsync({
      imports: [JwtConfigModule],
      inject: [JwtConfigService],
      useFactory: async (jwtConfig: JwtConfigService) => ({
        secret: jwtConfig.secret,
        signOptions: { expiresIn: jwtConfig.tokenExpiration }
      })
    }),
  ],
  exports: [AuthService]
})
export class AuthModule {}