import { SaveGameLevelDto } from '../models/dto/save-game-levels.dto';
import { ResponseStatus } from '../../../global-interfaces/response-status.interface'
import { Body, Controller, Post, ValidationPipe, Param, Get, Query, Put, Delete } from '@nestjs/common';
import { GameLevelsService } from '../services/game-levels.service';

@Controller('game-levels')
export class GameLevelsController {

  constructor(private gameLevelService: GameLevelsService){}

  @Get('/get-all?')
  async getAll(@Query('limit') limit: string): Promise<ResponseStatus>{
    return this.gameLevelService.getAllGameLevels(limit)
  }

  @Post('add')
  async create(@Body(ValidationPipe) post: SaveGameLevelDto): Promise<ResponseStatus>{
    return this.gameLevelService.postSaveGameLevel(post)
  }

  @Get(':id')
  async getData(@Param('id') id: string): Promise<ResponseStatus>{
    return this.gameLevelService.getSpecificGameLevel(parseInt(id))
  }

  @Put('update')
  async update(@Body(ValidationPipe) put: SaveGameLevelDto): Promise<ResponseStatus>{
    return this.gameLevelService.updateGameLevel(put)
  }

  @Delete('/delete-level/:id')
  async delete(@Param('id') id: number): Promise<ResponseStatus>{
    return this.gameLevelService.deleteGameLevel(id)
  }

  //STUDENT GAME LEVELS
  @Get('student-levels/:studentID')
  async getStudentLevels(@Param('studentID') studentID: string): Promise<ResponseStatus>{
    return this.gameLevelService.getStudentGameLevels(studentID)
  }
}
