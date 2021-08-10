import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LogUserDto } from "../dto/log-user.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const userLogInfo = new LogUserDto()
    userLogInfo.username = username;
    userLogInfo.password = password;
    const currentUser = await this.authService.validateUser(userLogInfo);
    if (!currentUser) {
      throw new UnauthorizedException();
    }
    return currentUser;
  }
}