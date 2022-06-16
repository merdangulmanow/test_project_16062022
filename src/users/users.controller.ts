import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createUserDTO } from './dto/creaet.user.dto';
import { createUserResponse, deleteUserResponse, getAllUsersResponse, getOneUserResponse } from './response/user.response';
import { UsersService } from './users.service';

@ApiTags("users")
@Controller('users')
export class UsersController {
    constructor(private readonly userService : UsersService){}

    @ApiOperation({summary: 'create new user'})
    @ApiResponse({status : 201, schema : {example : createUserResponse}})
    @Post()
    createUser(@Body() dto : createUserDTO){
        return this.userService.createUser(dto)
    }

    @ApiOperation({summary : "get all users"})
    @ApiResponse({status : 200, schema : {example : getAllUsersResponse}})
    @Get()
    getAllUsers(){
        return this.userService.getAllUsers()
    }

    @ApiOperation({summary : "get one user data"})
    @ApiResponse({status : 200, schema : { example : getOneUserResponse}})
    @Get("/:userId")
    getOneUser(@Param("userId") userId : number){
        return this.userService.getOneUser(userId)
    }

    @ApiOperation({summary : "edit user data"})
    @ApiResponse({schema : { example : getOneUserResponse}})
    @Put("/:userId")
    edtiPost(@Param("userId")userId : number, @Body() dto : createUserDTO){
        return this.userService.editUser(userId, dto)
    }

    @ApiOperation({summary : "delete one user"})
    @ApiResponse({status : 200, schema : { example : deleteUserResponse}})
    @Delete('/:userId')
    deleteUser(@Param("userId") userId : number){
        return this.userService.deleteUser(userId)
    }
}