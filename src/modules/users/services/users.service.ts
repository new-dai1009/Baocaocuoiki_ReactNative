import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Address } from "src/database/entities/address.entity";
import { User } from "src/database/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(User)
        private usersRepository:Repository<User>
    ){}
    findAll(){
        return this.usersRepository.find()
    }

    async update(id:number, password:string,first_name:string,last_name:string){
        const user = await this.usersRepository.findOneBy({
            user_id:id,
        });
        user.password = password;
        user.first_name =first_name;
        user.last_name =last_name;
        
        await this.usersRepository.save(user)
    }

    // Get Address User
    async getUserAddresses(userId: number): Promise<Address[]> {
        const user = await this.usersRepository.findOne({
          where: { user_id: userId },
          relations: ['addresses'], // Load các địa chỉ của người dùng
        });
    
        if (!user) {
          throw new Error('User not found');
        }
        return user.addresses;
      }
    
    
}