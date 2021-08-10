import { User } from "../../users/schemas/user.schema";
import { ReturnInfoUserDto } from "../../users/dto/return-info-user.dto";

export class LoginReturnInfoUserDto extends ReturnInfoUserDto{
  constructor(token: string, user?: Partial<User>) {
    if (!user)
      return;
    super(user);
    this.access_token = token;
  }
  access_token: string;
}