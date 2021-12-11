import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class RegisterAdminDto { 

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

    //PASSWORD
    @ApiProperty({ minimum: 6, maximum: 20, description: 'At least 1 capital, 1 small, 1 special character & 1 number' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Password too weak, consider adding 1 capital, small, special and number character'}
    )
    password: string


}