import { ApiProperty } from "@nestjs/swagger"
import { IsString, MaxLength, IsEmail, IsNotEmpty, IsNumber, IsOptional } from "class-validator"

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

    //MIDDLENAME
    @ApiProperty({ maximum: 50 })
    @IsOptional()
    @MaxLength(50)
    middleName: string

    //LASTNAME
    @ApiProperty({ maximum: 50 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    lastName: string

    //SUFFIX
    @ApiProperty({ maximum: 5 })
    @IsOptional()
    @MaxLength(5)
    suffix: string
    

    //GRADE
    @ApiProperty({ maximum: 5 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(5)
    grade: string

    //SECTION
    @ApiProperty({ maximum: 20 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
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