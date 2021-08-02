import { User, UserDocument } from "./schemas/user.schema";
import {Injectable} from "@nestjs/common";

var crypto = require('crypto');


@Injectable()
export class UsersPassword {
    createSalt() {
        return crypto.randomBytes(16).toString('hex');
    };

    createHash(password: string, salt: string){
        return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    }


    validPwd(password: string, userSalt: string, userHash: string){
        const hash = crypto.pbkdf2Sync(password, userSalt, 1000, 64, `sha512`).toString(`hex`);
        return userHash === hash;
    }

}