import { ApiProperty } from "@nestjs/swagger"
import { IsString, MinLength, MaxLength, Matches, IsEmail, IsNotEmpty } from "class-validator"

export class RegisterStudentDto {

    //STUDENT ID
    @ApiProperty({ maximum: 15 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    studentID: string

    //FIRSTNAME
    @ApiProperty({ maximum: 50 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    firstName: string

    //LASTNAME
    @ApiProperty({ maximum: 50 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    lastName: string

    //GRADE
    @ApiProperty({ maximum: 5 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(5)
    grade: string

    //SECTION
    @ApiProperty({ maximum: 50 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    section: string


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