import { ApiProperty } from "@nestjs/swagger"
import { IsString, MaxLength, IsNotEmpty, IsIn, IsArray, ValidateNested, ArrayMinSize, IsOptional, IsNumber } from "class-validator"
import { Type } from 'class-transformer';

class AnswerDto {

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    storyID: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    questionID: number

    @ApiProperty({ maximum: 1 })
    @IsString()
    @IsNotEmpty()
    @IsIn(['A', 'B', 'C', 'D'])
    @MaxLength(1)
    answerLetter: string

}

export class SubmitQuizAnswerDto {

    @ApiProperty({ maximum: 15 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    studentID: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    gameLevelID: number

    //LIST OF STORIES
    @ApiProperty({ type: [AnswerDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => AnswerDto)
    answers: AnswerDto[]
     
}