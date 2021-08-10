import { User } from "../schemas/user.schema";
import { Post } from "../../posts/schemas/post.schema";

export class ReturnInfoUserDto {
  constructor(user: Partial<User>) {
    this._id = user._id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.isLog = user.isLog;
    this.username = user.username;
    this.roles = user.roles;
    this.posts = user.posts;
  }
  _id: string;
  roles: string[];
  lastName: string;
  firstName: string;
  email: string;
  username: string;
  isLog: boolean;
  posts: Post[];
}