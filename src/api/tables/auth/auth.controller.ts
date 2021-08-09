import { Body, Controller, Get, Param, Post, Request, UseGuards, ValidationPipe } from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt/jwt-auth.guard";
import { RegisterUserDto } from "./dto/register-user.dto"
import { LoginReturnInfoUserDto } from "./dto/login-return-info-user.dto";
import { ReturnInfoUserDto } from "../users/dto/return-info-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req): Promise<LoginReturnInfoUserDto> {
    return this.authService.login(req.user);
  }

  @Post('signup')
  signUp(
    @Body(ValidationPipe) registerUserDto: RegisterUserDto,
  ): Promise<ReturnInfoUserDto> {
    return this.authService.signUp(registerUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout/:userId')
  async logOut(@Param('userId') userId: string) {
    await this.authService.logOut(userId)
  }
}
