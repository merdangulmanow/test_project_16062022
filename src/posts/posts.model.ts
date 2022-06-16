import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { UserModel } from "src/users/user.model";

interface PostCreateAttributes {
    text : string
    userId : number
}

@Table({tableName : "posts"})
export class PostModel extends Model<PostModel, PostCreateAttributes>{
    @ApiProperty({example : 1, description : "id of post"})
    @Column({type : DataType.INTEGER, unique : true, autoIncrement : true, primaryKey : true})
    id : number;

    @ApiProperty({example : "hello world", description : "text of post"})
    @Column({type : DataType.TEXT, allowNull : false})
    text : string

    @ForeignKey( ()=>UserModel)
    @Column({type : DataType.INTEGER, allowNull : false})
    userId : number
    @BelongsTo(()=>UserModel)
    user : UserModel
}
