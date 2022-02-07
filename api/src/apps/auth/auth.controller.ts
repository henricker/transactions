import { Body, Controller, Post } from "@nestjs/common";
import { LoginDTO } from "src/common/dto/auth/login.dto";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {}

  @Post()
  login(
    @Body() dto: LoginDTO
  ) {
    return this.authService.login(dto);
  }

}