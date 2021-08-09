import { User } from "../schemas/user.schema";

export class UpdateUserDto {
  constructor(user?: Partial<User>) {
    if (!user)
      return;
    this.updatedAt = user.updatedAt;
    this.lastName = user.lastName;
    this.firstName = user.firstName;
    this.email = user.email;
    this.username = user.username;
  }
  updatedAt: Date;
  lastName: string;
  firstName: string;
  email: string;
  username: string;
  isLog: boolean;
}