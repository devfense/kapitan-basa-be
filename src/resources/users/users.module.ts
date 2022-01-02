import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//MAIN SERVICE
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';

//SUB SERVICE
import { TeacherService } from '../teacher/services/teacher.service';
import { TeacherEntity } from '../teacher/models/teacher.entity';

import { StudentService } from '../student/services/student.service';
import { StudentPostEntity } from '../student/models/student.entity';

import { AdminService } from '../admin/services/admin.service';
import { AdminPostEntity } from '../admin/models/admin.entity';


//GAME LEVELS
import { StoryEntity } from '../game-levels/models/stories.entity';
import { QuestionEntity } from '../game-levels/models/questions.entity';
import { ChoicesEntity } from '../game-levels/models/choices.entity';

import { StudentLevelsEntity } from '../game-levels/models/student-levels.entity';
import { StudentAnswerEntity } from '../game-levels/models/student_answers.entity';
import { GameLevelsEntity } from '../game-levels/models/game-levels.entity';



@Module({
  imports: [
    TypeOrmModule.forFeature([
      TeacherEntity, 
      StudentPostEntity, 
      AdminPostEntity, 
      StudentLevelsEntity, 
      GameLevelsEntity, 
      StudentAnswerEntity, 
      QuestionEntity, 
      ChoicesEntity, 
      StoryEntity])
  ],
  providers: [TeacherService, StudentService, UsersService, AdminService],
  controllers: [UsersController]
})
export class UsersModule {}
