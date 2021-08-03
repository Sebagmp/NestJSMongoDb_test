import {Injectable} from "@nestjs/common";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./schemas/user.schema";
import {CreateUserDto} from "./dto/create-user.dto";
import {v4 as uuidv4} from 'uuid';
import {UpdateUserDto} from "./dto/update-user.dto";
import {UsersPassword} from "./users.password";

const express = require('express');
const router = express.Router();

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    users: User[] = [];
    pwd = new UsersPassword();

    async insertUser(userInfo: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(userInfo);
        newUser.userID = uuidv4();
        newUser.isLog = false;
        /*newUser.salt = this.pwd.createSalt();
        newUser.hash = this.pwd.createHash(userInfo.password, newUser.salt);*/
        return newUser.save();
    }

    async logIn(username: string, password: string): Promise<User> {
        const user = this.userModel.findOne({username: username, password: password});
        if (user) {
            const use = new UpdateUserDto();
            const userFilterQuery = {username};
            use.isLog = true;
            return this.userModel.findOneAndUpdate(userFilterQuery, use, {new: true});
        }
    }

    async updateUserInfo(userID: string, user: Partial<User>) {
        const userFilterQuery = {userID};
        return this.userModel.findOneAndUpdate(userFilterQuery, user, {new: true});
    }

    async updateUser(userID: string, userUpdates: UpdateUserDto): Promise<User> {
        return this.updateUserInfo(userID, userUpdates);
    }

    async logOut(userID: string): Promise<User> {
        const use = new UpdateUserDto();
        use.isLog = false;
        const userFilterQuery = {userID};
        return this.userModel.findOneAndUpdate(userFilterQuery, use, {new: true});
    }
}