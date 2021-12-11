import { Body, Controller, Get, Param, Post, Put, Query, ValidationPipe } from "@nestjs/common";
import { ResponseStatus } from "src/global-interfaces/response-status.interface";
import { RegisterAdminDto } from "../models/dto/register-admin.dto";
import { UpdateAdminDto } from "../models/dto/update-admin.dto";
import { AdminService } from "../services/admin.service";

@Controller('admin')
export class AdminController { 
    
    constructor(private adminService: AdminService) { }

    @Get('/get-all?')
    async getAll(@Query('limit') limit: string): Promise<ResponseStatus>{
        return this.adminService.getAllAdmin(limit)
    }

    @Post('register')
    async create(@Body(ValidationPipe) post: RegisterAdminDto): Promise<ResponseStatus>{
        return this.adminService.createAdmin(post)
    }

    @Get(':id')
    async getData(@Param('id') id: number): Promise<ResponseStatus>{
        return this.adminService.getAdminData(id)
    }

    @Put('update')
    async update(@Body(ValidationPipe) put: UpdateAdminDto): Promise<ResponseStatus>{
        return this.adminService.updateAdmin(put)
    }
}