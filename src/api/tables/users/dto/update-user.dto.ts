import { User } from "../schemas/user.schema";
import { Post } from "../../posts/schemas/post.schema";

export class UpdateUserDto {
  constructor(user?: User) {
    if (!user)
      return;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.isLog = user.isLog;
    this.username = user.username;
    this.updatedAt = user.updatedAt;
  }

  lastName: string;
  firstName: string;
  email: string;
  username: string;
  isLog: boolean;
  posts: Post[];
  updatedAt: Date;
}