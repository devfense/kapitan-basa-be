import { ApiProperty } from "@nestjs/swagger"
import { IsString, MinLength, MaxLength, Matches, IsEmail, IsNotEmpty, IsNumber } from "class-validator"

export class UpdateAdminDto {

    //ID
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id: number

    //FIRSTNAME
    @ApiProperty({ maximum: 50 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    firstName: string

    //MIDDLENAME
    @ApiProperty({ maximum: 50 })
    @IsString()
    @MaxLength(50)
    middleName: string

    //LASTNAME
    @ApiProperty({ maximum: 50 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    lastName: string

    //SUFFIX
    @ApiProperty({ maximum: 50 })
    @IsString()
    @MaxLength(50)
    suffix: string

    //CONTACT
    @ApiProperty({ maximum: 11 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(11)
    contact: string

    //USERNAME
    @ApiProperty({  maximum: 30 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    username: string

    //EMAIL ADDRESS
    @ApiProperty({  maximum: 50 })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(30)
    emailAddress: string

}