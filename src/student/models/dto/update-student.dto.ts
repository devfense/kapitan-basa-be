import { ApiProperty } from "@nestjs/swagger"
import { IsString, MinLength, MaxLength, Matches, IsEmail, IsNotEmpty, IsNumber } from "class-validator"

export class UpdateStudentDto {

    //ID
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id: number

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

    //USERNAME
    @ApiProperty({  maximum: 30 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    lastUpdatedBy: string
}