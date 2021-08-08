import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { UpdateUserDto } from "./dto/update-user.dto";
import { v4 as uuidv4 } from "uuid";
import { RegisterUserDto } from "../auth/dto/register-user.dto";
import * as bcrypt from "bcryptjs";
import { Post } from "../posts/schemas/post.schema";


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  async create(newUserInfo: RegisterUserDto): Promise<User> {
    const { email } = newUserInfo;
    const userExist = await this.userModel.findOne({ email });
    if (userExist) {
      throw new ConflictException("Username already exist");
    }
    const newUser = new this.userModel(newUserInfo);
    newUser.createdAt = new Date();
    newUser.updatedAt = new Date();
    newUser.userId = uuidv4();
    newUser.isLog = false;

    newUser.salt = await bcrypt.genSalt();
    newUser.password = await bcrypt.hash(newUser.password, newUser.salt);

    try {
      await newUser.save();
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("Username already exist");
      } else {
        throw new InternalServerErrorException();
      }
    }
    newUser.password = null;
    delete newUser.password;
    return newUser;
  }

  async updateInfo(updateInfo: UpdateUserDto, userFilterQuery: {}) {
    updateInfo.updatedAt = new Date();
    return this.userModel.findOneAndUpdate(userFilterQuery, updateInfo);
  }

  async logOut(userId: string) {
    const userUpdateInfo = new UpdateUserDto();
    userUpdateInfo.isLog = false;
    await this.updateInfo(userUpdateInfo, { userId });
  }

  async updatePostsArray(userId: string, newPost: Post)
  {
    const userCreator = await this.findById({userId});
    userCreator.posts.push(newPost);
    return await this.updateInfo(userCreator, {userId})
  }

  async findById(userId: {}): Promise<User> {
    return this.userModel.findOne(userId);
  }

  async findByEmail(email: {}): Promise<User> {
    return this.userModel.findOne(email);
  }

  async findByUsername(username: {}): Promise<User> {
    return this.userModel.findOne(username);
  }
}
