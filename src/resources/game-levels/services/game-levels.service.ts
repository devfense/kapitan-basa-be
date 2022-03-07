import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameLevelsEntity } from '../models/game-levels.entity';
import { StudentLevelsEntity } from '../models/student-levels.entity';
import { StudentAnswerEntity } from '../models/student_answers.entity';

import { SaveGameLevelDto } from '../models/dto/save-game-levels.dto';
import { SubmitQuizAnswerDto } from '../models/dto/submit-quiz-answer.dto';

//Constants
import { MESSAGES } from '../../../constants/messages'

//Helpers
import { responseOk, responseCreatedUpdated, responseNotFound, responseBadRequest, removeObjectKey, pagination } from '../../../helpers/Helpers'

//interfaces
import { PaginationData } from '../../../global-interfaces/response-status.interface'


@Injectable()
export class GameLevelsService {
    constructor(

       @InjectRepository(GameLevelsEntity)
       private readonly gameLevelRepository: Repository<GameLevelsEntity>,

       @InjectRepository(StudentLevelsEntity)
       private readonly studentLevelEntity: Repository<StudentLevelsEntity>


    ){}

    async postSaveGameLevel(postSaveGameLevelDto: SaveGameLevelDto) {
        try {
           
            if(await this.gameLevelRepository.save(postSaveGameLevelDto)){
                
                return responseCreatedUpdated(MESSAGES.GAME_LEVEL_SERVICE.CREATED)
            }
    
        } catch (error) {
            
            console.log(error)
            return responseBadRequest(error.detail || JSON.stringify(error) || 'Server Error');
            
        }
    }
    
    async getSpecificQuestion(id: number) {

        try {
            let QUESTION_DATA = await this.gameLevelRepository
                .createQueryBuilder('gameLevel')
                .select(['gameLevel.id', 'stories.id', 'questions.id', 'questions.questionContent'])
                .leftJoin('gameLevel.stories', 'stories') 
                .leftJoinAndSelect('stories.questions', 'questions')
                .leftJoinAndSelect('questions.choices','choices')
                .where('gameLevel.id = :gameLevelId', { gameLevelId: id })
                .getOne();
            if (QUESTION_DATA) { 

                //REMOVE THE ANSWER FIELD IN RETURN
                let FILTERED_QUESTIONS = QUESTION_DATA.stories.map((story) => {

                    let QUESTIONS = story.questions.map((question) => {
                        return removeObjectKey(['questionCorrectAnswerLetter'], question)
                    })

                    return { ...story, ['questions']: QUESTIONS }
                })

                return responseOk(MESSAGES.GAME_LEVEL_SERVICE.SUCCESS_FETCHED_QUESTION, FILTERED_QUESTIONS);

            } else { 
                return responseNotFound(MESSAGES.GAME_LEVEL_SERVICE.NOT_FOUND_QUESTION)
            }
            
        } catch (error) {

            console.log(error)
            return responseBadRequest(error.detail || JSON.stringify(error) || 'Server Error');
            
        }

    }

    async getSpecificStory(id: number) {       
        try {
            let STORY_DATA = await this.gameLevelRepository
                //USING QUERYBUILDEDR FOR DYNAMIC QUERYING
                .createQueryBuilder('gameLevel')
                .select(['gameLevel.id','stories'])
                .leftJoinAndSelect('gameLevel.stories', 'stories')
                .where('gameLevel.id = :gameLevelId', { gameLevelId: id })
                .getOne();

            if (STORY_DATA) {
                
                return responseOk(MESSAGES.GAME_LEVEL_SERVICE.SUCCESS_FETCHED_STORY, STORY_DATA);
                
            } else { 
                return responseNotFound(MESSAGES.GAME_LEVEL_SERVICE.NOT_FOUND_STORY)
            }
            
        } catch (error) {
            console.log(error)
            return responseBadRequest(error.detail || JSON.stringify(error) || 'Server Error');
            
        }

        
    }

    async getSpecificGameLevel(id: number){
        try {
            const GAME_LEVEL_DATA = await this.gameLevelRepository.findOne({ id: id });

            if(GAME_LEVEL_DATA){

                return responseOk(MESSAGES.GAME_LEVEL_SERVICE.SUCCESS_FETCHED, GAME_LEVEL_DATA);

            } else {
                return responseNotFound(MESSAGES.GAME_LEVEL_SERVICE.NOT_FOUND)
            }
            
        } catch (error) {

            console.log(error)
            return responseBadRequest(error.detail || JSON.stringify(error) || 'Server Error');

        }
    }

    async getStudentGameLevels(studentID: string, limit: string, page: string){
        try {
            const STUDENT_GAME_LEVEL_DATA = await this.studentLevelEntity.find({
                where: { studentID: studentID },
                order: {
                    gameLevelId: "ASC",
                },
                take: limit ? parseInt(limit) : 0,
                skip: pagination(limit, page),
            });

            const STUDENT_GAME_LEVEL_DATA_ALL = await this.studentLevelEntity.find({studentID: studentID });



            const UNLOCKED_GAME_LEVEL = this.getNextLevelToUnlock(STUDENT_GAME_LEVEL_DATA)


            if(STUDENT_GAME_LEVEL_DATA.length > 0){

                const FILTERED_STUDENT_GAME_LEVEL_DATA = STUDENT_GAME_LEVEL_DATA.map((data) => {

                    const FILTERED_LEVEL_DATA = removeObjectKey(['stories', 'createdAt', 'updatedAt', 'lastUpdatedBy'], data.gameLevelData)
                    delete data.gameLevelData
                    return {
                        ...removeObjectKey(['createdAt', 'lastUpdatedBy', 'studentAnswers'], data), 
                        ['locked']: data.gameLevelId === UNLOCKED_GAME_LEVEL ? false : true, 
                        ['gameLevelData']: FILTERED_LEVEL_DATA, 
                        }
                })

                let paginationData: PaginationData = {
                    overallTotal: STUDENT_GAME_LEVEL_DATA_ALL.length,
                    page: parseInt(page),
                    limit: parseInt(limit),
                }

                return responseOk(MESSAGES.GAME_LEVEL_SERVICE.STUDENT_GAME_LEVEL_SUCCESS_FETCHED, FILTERED_STUDENT_GAME_LEVEL_DATA, paginationData);

            } else {
                return responseNotFound(MESSAGES.GAME_LEVEL_SERVICE.STUDENT_GAME_LEVEL_NOT_FOUND)
            }
            
        } catch (error) {

            console.log(error)
            return responseBadRequest(error.detail || JSON.stringify(error) || 'Server Error');

        }
    }


    async getAllGameLevels(limit: string){
        try {
            
            const ALL_GAME_LEVELS_DATA = await this.gameLevelRepository.find({
                order: {
                    id: "ASC",
                },
                skip: 0,
                take: limit ? parseInt(limit) : 0,
            });

            if(ALL_GAME_LEVELS_DATA.length > 0){
                
                return responseOk(MESSAGES.GAME_LEVEL_SERVICE.SUCCESS_FETCHED, ALL_GAME_LEVELS_DATA);

            } else {
                return responseNotFound(MESSAGES.GAME_LEVEL_SERVICE.NOT_FOUND)
            }
            
        } catch (error) {   

            console.log(error)
            return responseBadRequest(error.detail || JSON.stringify(error) || 'Server Error');

        }
    }

    async updateGameLevel(postSaveGameLevelDto: SaveGameLevelDto) {
        try {

            if(await this.gameLevelRepository.save(postSaveGameLevelDto)){
                
                return responseCreatedUpdated(MESSAGES.GAME_LEVEL_SERVICE.UPDATED, undefined, true)
            }
    
        } catch (error) {
            
            console.log(error)
            return responseBadRequest(error.detail || JSON.stringify(error) || 'Server Error');
        }
    }

    async deleteGameLevel(id: number){
        try {
            
            const DELETE_GAME_LEVEL_DATA = await this.gameLevelRepository.delete({id: id});

            if(DELETE_GAME_LEVEL_DATA && DELETE_GAME_LEVEL_DATA.affected !== 0){
                
                return responseOk(MESSAGES.GAME_LEVEL_SERVICE.DELETED, DELETE_GAME_LEVEL_DATA);

            } else {
                return responseNotFound(MESSAGES.GAME_LEVEL_SERVICE.NOT_FOUND)
            }
            
        } catch (error) {
            console.log(error)
            return responseBadRequest(error.detail || JSON.stringify(error) || 'Server Error');
        }
    }

    async processQuizAnswer(quizAnswerData: SubmitQuizAnswerDto){
        try {
            
            const { studentID, gameLevelID, answers } = quizAnswerData

            let STUDENT_GAME_LEVEL_DATA = await this.studentLevelEntity.findOne({
                where: { studentID: studentID, gameLevelId: gameLevelID }
            });

            //CHECK IF THE GAME LEVEL IS NOT YET CLEARED
            if(STUDENT_GAME_LEVEL_DATA && !STUDENT_GAME_LEVEL_DATA.levelCleared){

                const QUESTIONS = STUDENT_GAME_LEVEL_DATA.gameLevelData.stories[0].questions

                let quizScore = 0
    
                answers.map((data) => {
                    const GET_QUESTION = QUESTIONS.find((question) => question.id === data.questionID)
                    quizScore = GET_QUESTION.questionCorrectAnswerLetter === data.answerLetter ? ++quizScore : quizScore
                })

                if(quizScore >= (QUESTIONS.length * 0.6)){

                    STUDENT_GAME_LEVEL_DATA.levelScore = quizScore
                    STUDENT_GAME_LEVEL_DATA.levelCleared = true
                    STUDENT_GAME_LEVEL_DATA.levelScoreSummary = `${quizScore}/${QUESTIONS.length}`
                    STUDENT_GAME_LEVEL_DATA.levelRemarks = "PASSED"
                    STUDENT_GAME_LEVEL_DATA.studentAnswers = answers.map((answer) => {

                        let newAnswer = new StudentAnswerEntity()
                        newAnswer.storyID = answer.storyID
                        newAnswer.questionID = answer.questionID
                        newAnswer.answerLetter = answer.answerLetter

                        return newAnswer

                    })

 
                    if(await this.studentLevelEntity.save(STUDENT_GAME_LEVEL_DATA)){
                        const FILTERED_RECORD = removeObjectKey(['gameLevelData', 'createdAt', 'lastUpdatedBy', 'studentAnswers'], STUDENT_GAME_LEVEL_DATA)
                        return responseOk(MESSAGES.GAME_LEVEL_SERVICE.SUCCESS_PROCESS_SUBMIT_QUIZ_ANSWER, FILTERED_RECORD)    
                    }


                } else {

                    STUDENT_GAME_LEVEL_DATA.levelScore = quizScore
                    STUDENT_GAME_LEVEL_DATA.levelScoreSummary = `${quizScore}/${QUESTIONS.length}`
                    STUDENT_GAME_LEVEL_DATA.levelRemarks = "FAILED"

                    if(await this.studentLevelEntity.save(STUDENT_GAME_LEVEL_DATA)){
                        const FILTERED_RECORD = removeObjectKey(['gameLevelData', 'createdAt', 'lastUpdatedBy', 'studentAnswers'], STUDENT_GAME_LEVEL_DATA)
                        return responseOk(MESSAGES.GAME_LEVEL_SERVICE.SUCCESS_PROCESS_SUBMIT_QUIZ_ANSWER, FILTERED_RECORD)    
                    }

                }
            } else {
                return responseBadRequest(MESSAGES.GAME_LEVEL_SERVICE.BAD_REQUEST_SUBMIT_QUIZ_ANSWER)
            }




            
        } catch (error) {

            console.log(error)
            return responseBadRequest(error.detail || JSON.stringify(error) || 'Server Error');

        }
    }

    private getNextLevelToUnlock(studGameLevels: StudentLevelsEntity[]): number {

       let highestClearedLevel = 0

       studGameLevels.forEach((level) => {
           if(level.levelCleared){
               highestClearedLevel = level.gameLevelId > highestClearedLevel ? level.gameLevelId : highestClearedLevel
           }
       })
       


       return studGameLevels[(studGameLevels.findIndex((level) => level.gameLevelId === highestClearedLevel) + 1)].gameLevelId
    }

}
