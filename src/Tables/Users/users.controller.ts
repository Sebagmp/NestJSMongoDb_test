import {Body, Controller, Get, Param, Patch, Post} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';

import {User} from './schemas/user.schema';
import {UsersService} from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Post('auth/signup')
    async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.insertUser(createUserDto)
    }

    @Post('auth/login')
    async logIn(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.logIn(createUserDto.username, createUserDto.password)
    }

    @Get('auth/logout/:userID')
    async logOut(@Param('userID') userID: string): Promise<User> {
        return this.usersService.logOut(userID)
    }

/*    @Get()
    async getUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }*/

    /*    @Get(':userId')
        async getUser(@Param('userId') userId: string): Promise<User> {
            return this.usersService.getUserById(userId);
        }*/

    @Patch('update/:userID')
    async updateUser(@Param('userID') userID: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersService.updateUser(userID, updateUserDto);
    }
}
