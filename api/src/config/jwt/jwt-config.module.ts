import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "./configuration";
import { JwtConfigService } from "./jwt-config.service";

@Module({
  providers: [JwtConfigService],
  exports: [JwtConfigService, JwtConfigModule],
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    })
  ]
})
export class JwtConfigModule {}