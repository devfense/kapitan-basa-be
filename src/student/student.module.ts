import { Module } from '@nestjs/common';
import { StudentService } from './services/student.service';
import { StudentController } from './controllers/student.controller';
import { StudentPostEntity } from './models/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentPostEntity])
  ],
  providers: [StudentService],
  controllers: [StudentController]
})
export class StudentModule {}
