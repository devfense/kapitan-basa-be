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



@Module({
  imports: [
    TypeOrmModule.forFeature([TeacherEntity, StudentPostEntity])
  ],
  providers: [TeacherService, StudentService, UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
