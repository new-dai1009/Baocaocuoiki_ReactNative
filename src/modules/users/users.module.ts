import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { UsersService } from "./services/users.service";
import { UserController } from "./controller/users.controller";
import { AuthService } from "./services/auth.service";

@Module({
    imports:[TypeOrmModule.forFeature([
        User
    ]),
],
    exports:[TypeOrmModule],
    providers:[UsersService,AuthService],
    controllers:[UserController]
})

export class UserModule{}