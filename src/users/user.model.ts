import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { PostModel } from "src/posts/posts.model";

interface UserCreateAttributes {
    name : string;
    age : number
}

@Table({tableName : "users"})
export class UserModel extends Model<UserModel, UserCreateAttributes>{
    @ApiProperty({example : 1, description : "id of user"})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example : "John Doe", description : "name of user"})
    @Column({type : DataType.STRING, allowNull : false})
    name : string

    @ApiProperty({example : 22, description : "age of user"})
    @Column({type : DataType.INTEGER, allowNull : false})
    age : number

    @HasMany( ()=>PostModel)
    posts : PostModel
}