import { IsEmail, IsNotEmpty, MaxLength, MinLength, Matches  } from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    roles: [];

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(50)
    @Matches(/^(?=.*\d).{5,20}$/, {
        message: 'password too weak',
    })
    password: string;
}