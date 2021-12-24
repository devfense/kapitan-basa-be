import { Module } from '@nestjs/common';
import { GameLevelsService } from './services/game-levels.service';
import { GameLevelsController } from './controllers/game-levels.controller';
import { GameLevelsEntity } from './models/game-levels.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
//SUB ENTITES
import { StoryEntity } from './models/stories.entity';
import { QuestionEntity } from './models/questions.entity';
import { ChoicesEntity } from './models/choices.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([GameLevelsEntity, QuestionEntity, ChoicesEntity, StoryEntity])
  ],
  providers: [GameLevelsService],
  controllers: [GameLevelsController]
})
export class GameLevelsModule {}
