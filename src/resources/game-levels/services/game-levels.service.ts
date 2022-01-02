import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameLevelsEntity } from '../models/game-levels.entity';
import { StudentLevelsEntity } from '../models/student-levels.entity';
import { SaveGameLevelDto } from '../models/dto/save-game-levels.dto';

//Constants
import { MESSAGES } from '../../../constants/messages'

//Helpers
import { responseOk, responseCreatedUpdated, responseNotFound, responseBadRequest, removePasswordField, removeObjectKey } from '../../../helpers/Helpers'

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
                return responseOk(MESSAGES.GAME_LEVEL_SERVICE.SUCCESS_FETCHED_QUESTION, QUESTION_DATA);

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

    async getStudentGameLevels(studentID: string){
        try {
            const STUDENT_GAME_LEVEL_DATA = await this.studentLevelEntity.find({
                where: { studentID: studentID },
                order: {
                    gameLevelId: "ASC",
                },
                skip: 0,
                take: 0,
            });

            if(STUDENT_GAME_LEVEL_DATA.length > 0){

                const FILTERED_STUDENT_GAME_LEVEL_DATA = STUDENT_GAME_LEVEL_DATA.map((data) => {

                    const FILTERED_LEVEL_DATA = removeObjectKey(['stories', 'createdAt', 'updatedAt', 'lastUpdatedBy'], data.gameLevelData)
                    delete data.gameLevelData
                    return {...removeObjectKey(['createdAt', 'updatedAt', 'lastUpdatedBy'], data), ['gameLevelData']: FILTERED_LEVEL_DATA}
                })

                return responseOk(MESSAGES.GAME_LEVEL_SERVICE.STUDENT_GAME_LEVEL_SUCCESS_FETCHED, FILTERED_STUDENT_GAME_LEVEL_DATA);

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

}
