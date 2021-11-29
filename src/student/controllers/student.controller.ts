import { RegisterStudentDto } from '../models/dto/register-student.dto';
import { UpdateStudentDto } from '../models/dto/update-student.dto';
import { ResponseStatus } from '../../global-interfaces/response-status.interface'
import { Body, Controller, HttpException, HttpStatus, Post, ValidationPipe, Param, Get, Query, Put } from '@nestjs/common';
import { StudentService } from '../services/student.service';

@Controller('student')
export class StudentController {

  constructor(private studentService: StudentService){}

  @Get('/get-all?')
  async getAll(@Query('limit') limit: string): Promise<ResponseStatus>{
    return this.studentService.getAllStudent(limit)
  }

  @Post('register')
  async create(@Body(ValidationPipe) post: RegisterStudentDto): Promise<ResponseStatus>{
    return this.studentService.createStudent(post)
  }

  @Get(':id')
  async getData(@Param('id') studentID: string): Promise<ResponseStatus>{
    return this.studentService.getStudentData(studentID)
  }

  @Put('update')
  async update(@Body(ValidationPipe) put: UpdateStudentDto): Promise<ResponseStatus>{
    return this.studentService.updateStudent(put)
  }
}
