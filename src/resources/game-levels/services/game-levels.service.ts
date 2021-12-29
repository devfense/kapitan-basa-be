import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameLevelsEntity } from '../models/game-levels.entity';
import { SaveGameLevelDto } from '../models/dto/save-game-levels.dto';

//Constants
import { MESSAGES } from '../../../constants/messages'

//Helpers
import { responseOk, responseCreatedUpdated, responseNotFound, responseBadRequest, removePasswordField } from '../../../helpers/Helpers'

@Injectable()
export class GameLevelsService {
    constructor(
       @InjectRepository(GameLevelsEntity)
       private readonly gameLevelRepository: Repository<GameLevelsEntity>
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

    async getAllGameLevels(limit: string){
        try {
            
            const ALL_GAME_LEVELS_DATA = await this.gameLevelRepository.find({
                order: {
                    id: "ASC",
                },
                skip: 0,
                take: limit ? parseInt(limit) : 0,
            });

            if(ALL_GAME_LEVELS_DATA){
                
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
