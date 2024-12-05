import { IsEmail, IsString } from "class-validator";

export class SignInUserDTO{
    @IsEmail()
    username: string;

    @IsString()
    password: string;

    
}