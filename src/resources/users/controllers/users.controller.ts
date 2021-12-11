import { ResponseStatus } from '../../../global-interfaces/response-status.interface'
import { Body, Controller, Post, ValidationPipe, Param, Get, Query, Put, Delete } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { LoginUserDto, ProcessUserDto } from '../users.dto'

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService){}

  @Get('/get-all?')
  async getAll(@Query('limit') limit: string): Promise<ResponseStatus>{
    return this.usersService.getAllUsers(limit)
  }

  @Put('process-approve-reject')
  async process(@Body(ValidationPipe) put: ProcessUserDto): Promise<ResponseStatus>{
    return this.usersService.processUser(put)
  }

  @Post('auth')
  async authenticate(@Body(ValidationPipe) post: LoginUserDto): Promise<ResponseStatus>{
    return this.usersService.authenticateUser(post)
  }

  // @Get(':id')
  // async getData(@Param('id') id: number): Promise<ResponseStatus>{
  //   return this.usersService.getTeacherData(id)
  // }

  // @Put('update')
  // async update(@Body(ValidationPipe) put: UpdateTeacherDto): Promise<ResponseStatus>{
  //   return this.usersService.updateTeacher(put)
  // }

  // @Delete('/delete-record/:id')
  // async delete(@Param('id') id: number): Promise<ResponseStatus>{
  //   return this.usersService.deleteTeacher(id)
  // }
}
