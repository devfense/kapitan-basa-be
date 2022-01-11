import { RegisterStudentDto } from '../models/dto/register-student.dto';
import { UpdateStudentDto } from '../models/dto/update-student.dto';
import { ResponseStatus } from '../../../global-interfaces/response-status.interface'
import { Body, Controller, Post, ValidationPipe, Param, Get, Query, Put, Delete } from '@nestjs/common';
import { StudentService } from '../services/student.service';

@Controller('student')
export class StudentController {

  constructor(private studentService: StudentService){}

  @Get('/get-all?')
  async getAll(@Query('limit') limit: string, @Query('page') page: string): Promise<ResponseStatus>{
    return this.studentService.getAllStudent(limit, page)
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

  @Delete('/delete-record/:id')
  async delete(@Param('id') id: number): Promise<ResponseStatus>{
    return this.studentService.deleteStudent(id)
  }
}
