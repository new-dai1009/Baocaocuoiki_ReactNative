import { IsEmail, IsOptional, IsString } from "class-validator";

export class RegisterUserDto{
    @IsEmail()
    username: string;

    @IsString()
    last_name: string;

    @IsString()
    first_name: string;

    @IsString()
    password: string;

    
}