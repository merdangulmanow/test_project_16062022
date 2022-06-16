import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiGuard } from './api.guard';
import { createPostDTO } from './dto/create.post.dto';
import { PostsService } from './posts.service';
import { deletePostResponse } from './response/post.response';

@ApiTags("Posts")
@Controller('posts')
export class PostsController {
    constructor(private postService : PostsService){}

    @UseGuards(ApiGuard)
    @ApiOperation({summary : "create post"})
    @ApiResponse({status : 201, schema : {example : createPostDTO}})
    @Post()
    createPost(@Body() dto : createPostDTO){
        return this.postService.createPost(dto)
    }

    @UseGuards(ApiGuard)
    @ApiOperation({summary : "edit post"})
    @ApiResponse({status : 200, schema : {example : createPostDTO}})
    @Put('/:postId')
    editPost(
        @Body() dto : createPostDTO,
        @Param("postId") postId : number
    ){
        return this.postService.editPost(postId, dto)
    }

    @ApiOperation({summary : "get one post"})
    @ApiResponse({status : 201, schema : {example : createPostDTO}})
    @Get("/:postId")
    getOnePost(@Param("postId") postId : number){
        return this.postService.getOnePost(postId)
    }

    @UseGuards(ApiGuard)
    @ApiOperation({summary : "delete one user"})
    @ApiResponse({status : 200, schema :{example : deletePostResponse}})
    @Delete("/:postId")
    deletePost(@Param("postId") postId : number){
        return this.postService.deletePost(postId)
    }

}