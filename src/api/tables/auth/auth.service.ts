import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { LogUserDto } from "./dto/log-user.dto";
import { RegisterUserDto } from "./dto/register-user.dto";
import { User } from "../users/schemas/user.schema";
import * as bcrypt from "bcryptjs";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { UpdateUserDto } from "../users/dto/update-user.dto";
import { LoginReturnInfoUserDto } from "./dto/login-return-info-user.dto";
import { ReturnInfoUserDto} from "../users/dto/return-info-user.dto";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
              private jwtService: JwtService) {
  }

  async validateUser(logUser: LogUserDto): Promise<any> {
    const { username, password } = logUser;
    const currentUser = await this.usersService.findByUsernameFullInfo({ username });
    if (await AuthService.validatePassword(currentUser, password)) {
      const { password, ...result } = currentUser;
      return result;
    }
    return null;
  }

  private static async comparePassword(pwd: string, hash: string) {
    return await bcrypt.compare(pwd, hash);
  };

  private static async validatePassword(userCheckPwd: User, pwdToCheck: string) {
    const userPwd = userCheckPwd.password;
    return userCheckPwd && (await AuthService.comparePassword(pwdToCheck, userPwd));
  }

  async login(logForm: any): Promise<LoginReturnInfoUserDto> {
    const email = logForm._doc.email;
    let userFound = await this.usersService.findByEmail({ email });
    if (!userFound) {
      throw new UnauthorizedException("Invalid credential");
    }

    userFound.isLog = true;
    const userUpdateInfo = new UpdateUserDto(userFound);
    const userId = userFound.userId;
    await this.usersService.updateInfo(userUpdateInfo, { userId });

    const payload = {
      email: userFound.email,
      sub: userFound.userId,
      username: userFound.username,
      roles: userFound.roles
    };
    const token = this.jwtService.sign(payload);
    return new LoginReturnInfoUserDto(token, userFound);
  }

  async signUp(registerForm: RegisterUserDto): Promise<ReturnInfoUserDto> {
    const user = await this.usersService.create(registerForm);
    return new ReturnInfoUserDto(user);
  }

  async logOut(userId: string) {
    const currentUser = await this.usersService.findById({ userId });
    if (!currentUser)
      throw new NotFoundException("User Not found");
    await this.usersService.logOut(currentUser.userId);
  }
}