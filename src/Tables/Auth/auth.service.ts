import { Injectable } from '@nestjs/common';
import { UsersService } from '../Users/users.service';
import {UpdateUserDto} from "../Users/dto/update-user.dto";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(username: string, pwd: string): Promise<any> {
        return await this.usersService.logIn(username, pwd);
    }
}