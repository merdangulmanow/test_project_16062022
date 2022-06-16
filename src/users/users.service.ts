import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PostModel } from 'src/posts/posts.model';
import { createUserDTO } from './dto/creaet.user.dto';
import { UserModel } from './user.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(UserModel) private readonly userRepository : typeof UserModel,
    ){}

    async createUser(dto : createUserDTO){
        try {
            const user : UserModel = await this.userRepository.create(dto)
            return {success : true, data : user}
        } catch (err) {
            throw new HttpException({ status: HttpStatus.BAD_REQUEST, success: false,message: err.message}, HttpStatus.BAD_REQUEST);
        }
    }

    async getOneUser(userId : number){
        try {
            const user : UserModel = await this.userRepository.findOne({where : {id : userId}, 
                include : [
                    {
                        model : PostModel
                    }
                ]
            })
            return {success : true, data : user}
        } catch (err) {
            throw new HttpException({ status: HttpStatus.BAD_REQUEST, success: false,message: err.message}, HttpStatus.BAD_REQUEST);
        }
    }

    async getAllUsers(){
        try {
            const users : UserModel[] = await this.userRepository.findAll()
            return {success : true, data : users}
        } catch (err) {
            throw new HttpException({ status: HttpStatus.BAD_REQUEST, success: false,message: err.message}, HttpStatus.BAD_REQUEST);
        }
    }

    async editUser(userId : number, dto : createUserDTO){
        try {
            const user : UserModel = await this.userRepository.findOne({where : {id : userId}})
            if(!user){
                throw new HttpException({ status: HttpStatus.NOT_FOUND, success: false,message: "user not foud"}, HttpStatus.NOT_FOUND);
            }
            user.name = dto.name;
            user.age = dto.age;
            await user.save()
            return {success : true, data : user}
        } catch (err) {
            throw new HttpException({ status: HttpStatus.BAD_REQUEST, success: false,message: err.message}, HttpStatus.BAD_REQUEST);
        }
    }

    async deleteUser(userId : number){
        try {
            await this.userRepository.destroy({where : {id : userId}})
            return {success : true, message : "deleted"}
        } catch (err) {
            throw new HttpException({ status: HttpStatus.BAD_REQUEST, success: false,message: err.message}, HttpStatus.BAD_REQUEST);
        }
    }
}