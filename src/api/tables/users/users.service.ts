import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { UpdateUserDto } from "./dto/update-user.dto";
import { v4 as uuidv4 } from "uuid";
import { RegisterUserDto } from "../auth/dto/register-user.dto";
import * as bcrypt from "bcryptjs";
import { Post } from "../posts/schemas/post.schema";
import { ReturnInfoUserDto } from "./dto/return-info-user.dto";
import { elementAt } from "rxjs";


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

  async updateInfo(updateInfo: Partial<UpdateUserDto>, userFilterQuery: {}) {
    updateInfo.updatedAt = new Date();
    return this.userModel.findOneAndUpdate(userFilterQuery, updateInfo, { useFindAndModify: false });
  }

  async logOut(userId: string) {
    const userUpdateInfo = new UpdateUserDto();
    userUpdateInfo.isLog = false;
    await this.updateInfo(userUpdateInfo, { userId });
  }

  async updatePostsArray(_id: Types.ObjectId | string, newPost: Post) {
    const userCreator = await this.findById({ _id });
    userCreator.posts.push(newPost);
    return await this.updateInfo(userCreator, { _id });
  }

  async findById(userId: {}): Promise<ReturnInfoUserDto> {
    const user = await this.userModel.findOne(userId);
    return new ReturnInfoUserDto(user);
  }

  async findByEmail(email: {}): Promise<ReturnInfoUserDto> {
    const user = await this.userModel.findOne(email);
    return new ReturnInfoUserDto(user);
  }

  async findByUsername(username: {}): Promise<ReturnInfoUserDto> {
    const user = await this.userModel.findOne(username);
    return new ReturnInfoUserDto(user);
  }

  async findByUsernameFullInfo(username: {}): Promise<User> {
    return this.userModel.findOne(username);
  }

  async findAll() {
    const usersListInfo = [];
    let count = 0;
    const usersList = await this.userModel.find();
    usersList.forEach(function(element) {
      usersListInfo[count] = new ReturnInfoUserDto(element);
      count++;
    });
    return usersListInfo;
  }

  async findOne(_id: string): Promise<ReturnInfoUserDto> {
    const user = await this.userModel.findOne({ _id });
    return new ReturnInfoUserDto(user);
  }

  async update(_id: string, updateUserDto: UpdateUserDto): Promise<ReturnInfoUserDto> {
    updateUserDto.updatedAt = new Date();
    const user = await this.updateInfo(updateUserDto, { _id });
    return new ReturnInfoUserDto(user);
  }

  async remove(_id: string): Promise<ReturnInfoUserDto> {
    const user = await this.userModel.findByIdAndDelete(_id);
    return new ReturnInfoUserDto(user);
  }
}
