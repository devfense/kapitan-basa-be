import { ApiProperty } from "@nestjs/swagger"
import { IsString, MaxLength, IsNotEmpty, IsIn } from "class-validator"

export class ProcessUserDto {

    //USERNAME
    @ApiProperty({  maximum: 30 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    username: string

    //ACTION
    @ApiProperty()
    @IsString()
    @IsIn(['APPROVED', 'REJECT'])
    @IsNotEmpty()
    action: string


}

export class LoginUserDto {

    //USERNAME
    @ApiProperty({  maximum: 30 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    username: string

    //PASSWORD
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string

}