import { ApiProperty } from "@nestjs/swagger"
import { IsString, MaxLength, IsNotEmpty, IsIn, IsArray, ValidateNested, ArrayMinSize, IsOptional, IsNumber } from "class-validator"
import { Type } from 'class-transformer';

class ChoicesDto {

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id: number

    @ApiProperty({ maximum: 1 })
    @IsString()
    @IsNotEmpty()
    @IsIn(['A', 'B', 'C', 'D'])
    @MaxLength(1)
    choiceLetter: string

    @ApiProperty({ maximum: 350 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(350)
    choiceDescription: string
    
}

class QuestionDto {

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id: number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    questionContent: string

    @ApiProperty({ maximum: 1 })
    @IsString()
    @IsIn(['A', 'B', 'C', 'D'])
    @IsNotEmpty()
    @MaxLength(1)
    questionCorrectAnswerLetter: string

    //LIST OF CHOICES
    @ApiProperty({ type: [ChoicesDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(2)
    @Type(() => ChoicesDto)
    choices: ChoicesDto[]
     
}

class StoryDto {

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id: number

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    storyContent: string

    //LIST OF QUESTIONS
    @ApiProperty({ type: [QuestionDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => QuestionDto)
    questions: QuestionDto[]
     
}

export class SaveGameLevelDto {

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id: number

    @ApiProperty({ maximum: 50 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    levelName: string

    @ApiProperty({ maximum: 50 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    levelTitle: string

    @ApiProperty({ maximum: 250 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(250)
    levelDescription: string

    @ApiProperty({ maximum: 300 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(300)
    levelBgImgUrl: string

    //LIST OF STORIES
    @ApiProperty({ type: [StoryDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => StoryDto)
    stories: StoryDto[]
     
}