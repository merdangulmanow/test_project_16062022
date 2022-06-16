import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsNumber } from "class-validator";

export class createPostDTO {
    @ApiProperty({example : "hello world", description : "text of post"})
    @IsString()
    // @Length(20, 500)
    readonly text : string

    @ApiProperty({example : 1, description : "id of user"})
    @IsNumber()
    readonly userId : number
}