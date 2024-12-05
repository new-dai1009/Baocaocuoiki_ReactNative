import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database/entities/user.entity";
import { FindOptionsWhere, Repository } from "typeorm";
import { RegisterUserDto } from "../dto/register-user.dto";
import { BadRequestException } from "@nestjs/common";
import * as bcrypt from "bcrypt";

export class AuthService{
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>
    ){}

    async register(registerUser:RegisterUserDto){
        const isExist = await this.userRepository.existsBy({
            username: registerUser.username
        })

        if(isExist){
            throw new BadRequestException('User already exists')
        } else{

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(registerUser.password, saltRounds);
            

            const user=this.userRepository.create({
                ...registerUser,
                password: hashedPassword
            })
            return await this.userRepository.save(user)
            }
        }

        async signIn(username: string, password: string){
            const user = await this.userRepository.findOne({
                where: { username } ,
            });
    
            if(!user){
                throw new BadRequestException('Invalid email or password');
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                throw new BadRequestException('Invalid email or password');
            } 
            const { password: _, ...result } = user;
            return result;
        }
    }
