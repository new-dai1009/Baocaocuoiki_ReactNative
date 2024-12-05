import { AuthService } from './../services/auth.service';
import { RegisterUserDto } from '../dto/register-user.dto';
import { UsersService } from './../services/users.service';
import { Body, Controller, Get, Param, Patch, Post, Session } from "@nestjs/common";
import { SignInUserDTO } from '../dto/sig-in-user.dto';
import { Address } from 'src/database/entities/address.entity';

@Controller('users')
export class UserController{
    constructor(
        private UsersService:UsersService,
        private AuthService:AuthService
    ){}
    @Get()
    findAll(){
        return this.UsersService.findAll()
    }
    @Get(":userId/addresses")
    getAddressUser(@Param('userId') userId: number): Promise<Address[]>{
        return this.UsersService.getUserAddresses(userId);
    }
    @Patch('changeinfo/:id')
    update(@Param('id')id:number,
           @Body() body ){
        return this.UsersService.update(+id,body.password,body.first_name,body.last_name)
    }
    @Post('register')
    async register(@Body() body:RegisterUserDto){
        return await this.AuthService.register(body)
    }

    @Post('sign-In')
    async signIn(
        @Body () body: SignInUserDTO,
        @Session() session: Record<string,any>,
    ){
        const user= await this.AuthService.signIn(body.username, body.password);
        session
        session.user=user.user_id;
        return {message:"Login successfully!", user};
    }
}