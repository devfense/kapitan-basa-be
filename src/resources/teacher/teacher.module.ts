import { Module } from '@nestjs/common';
import { TeacherService } from './services/teacher.service';
import { TeacherController } from './controllers/teacher.controller';
import { TeacherEntity } from './models/teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([TeacherEntity])
  ],
  providers: [TeacherService],
  controllers: [TeacherController]
})
export class TeacherModule {}
