import { RegisterTeacherDto } from '../models/dto/register-teacher.dto';
import { UpdateTeacherDto } from '../models/dto/update-teacher.dto';
import { ResponseStatus } from '../../../global-interfaces/response-status.interface'
import { Body, Controller, Post, ValidationPipe, Param, Get, Query, Put, Delete } from '@nestjs/common';
import { TeacherService } from '../services/teacher.service';

@Controller('teacher')
export class TeacherController {

  constructor(private teacherService: TeacherService){}

  @Get('/get-all?')
  async getAll(@Query('limit') limit: string): Promise<ResponseStatus>{
    return this.teacherService.getAllTeachers(limit)
  }

  @Post('register')
  async create(@Body(ValidationPipe) post: RegisterTeacherDto): Promise<ResponseStatus>{
    return this.teacherService.createTeacher(post)
  }

  @Get(':id')
  async getData(@Param('id') id: number): Promise<ResponseStatus>{
    return this.teacherService.getTeacherData(id)
  }

  @Put('update')
  async update(@Body(ValidationPipe) put: UpdateTeacherDto): Promise<ResponseStatus>{
    return this.teacherService.updateTeacher(put)
  }

  @Delete('/delete-record/:id')
  async delete(@Param('id') id: number): Promise<ResponseStatus>{
    return this.teacherService.deleteTeacher(id)
  }
}
