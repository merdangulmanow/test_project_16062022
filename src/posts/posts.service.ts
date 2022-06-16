import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createPostDTO } from './dto/create.post.dto';
import { PostModel } from './posts.model';

@Injectable()
export class PostsService {
    constructor(@InjectModel(PostModel) private readonly postRepository : typeof PostModel){}

    async createPost(dto : createPostDTO){
        try {
            const post : PostModel = await this.postRepository.create(dto)
            return {success : true, data : post}
        } catch (err) {
            throw new HttpException({ status: HttpStatus.BAD_REQUEST, success: false,message: err.message}, HttpStatus.BAD_REQUEST);
        }
    }

    async editPost(postId : number, dto : createPostDTO){
        try {
            const post : PostModel = await this.postRepository.findOne({where : {id : postId}})
            if(!post){
                throw new HttpException({ status: HttpStatus.NOT_FOUND, success: false,message: "post not found"}, HttpStatus.NOT_FOUND);
            }
            post.userId = dto.userId;
            post.text = dto.text;
            await post.save()
            return {success : true, data : post}
        } catch (err) {
            throw new HttpException({ status: HttpStatus.BAD_REQUEST, success: false,message: err.message}, HttpStatus.BAD_REQUEST);
        }
    }

    async getOnePost(postId : number){
        try {
            const condidate : PostModel = await this.postRepository.findOne({where : {id : postId}})
            return {success : true, data : condidate}
        } catch (err) {
            throw new HttpException({ status: HttpStatus.BAD_REQUEST, success: false,message: err.message}, HttpStatus.BAD_REQUEST);
        }
    }

    async deletePost(postId : number){
        try {
            await this.postRepository.destroy({where : {id : postId}})
            return {success : true, message : "deleted"}
        } catch (err) {
            throw new HttpException({ status: HttpStatus.BAD_REQUEST, success: false,message: err.message}, HttpStatus.BAD_REQUEST);
        }
    }
}