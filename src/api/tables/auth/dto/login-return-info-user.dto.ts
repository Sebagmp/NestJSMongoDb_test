import { User } from "../../users/schemas/user.schema";

export class LoginReturnInfoUserDto {
  constructor(token: string, user?: Partial<User>) {
    this.access_token = token;
    if (!user)
      return;
    this.username = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.userId = user.userId;
    this.email = user.email;
    this.roles = user.roles;
  }

  access_token: string;
  firstName: string;
  lastName: string;
  username: string;
  roles: [];
  email: string;
  userId: string;

}