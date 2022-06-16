import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Length } from "class-validator";

export class createUserDTO{
    @ApiProperty({example : "John Doe", description : "name of user"})
    @IsString()
    // @Length(5, 55)
    readonly name : string

    @ApiProperty({example : 22, description : "age of user"})
    @IsNumber()
    readonly age : number
}