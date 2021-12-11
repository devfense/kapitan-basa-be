import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherEntity } from '../models/teacher.entity';
import { RegisterTeacherDto } from '../models/dto/register-teacher.dto';
import { UpdateTeacherDto } from '../models/dto/update-teacher.dto';

import * as bcrypt from 'bcrypt'

//Constants
import { MESSAGES } from '../../../constants/messages'

//Helpers
import { responseOk, responseCreatedUpdated, responseNotFound, responseBadRequest, removePasswordField } from '../../../helpers/Helpers'

@Injectable()
export class TeacherService {
    constructor(
       @InjectRepository(TeacherEntity)
       private readonly teacherRepository: Repository<TeacherEntity>
    ){}

    async createTeacher(createTeacherDto: RegisterTeacherDto) {
        try {
            const { 
                firstName,
                middleName,
                lastName,
                suffix,
                username,
                emailAddress,
                password
            } = createTeacherDto

            const newTeacher = new TeacherEntity()

            newTeacher.firstName = firstName;
            newTeacher.lastName = lastName;
            newTeacher.username = username;
            newTeacher.emailAddress = emailAddress;
            newTeacher.middleName = middleName;
            newTeacher.suffix = suffix
            //DO SOME PASSWORD ENCRPYTION
            newTeacher.passwordSalt = await bcrypt.genSalt()
            newTeacher.password = await this.hashPassword(password, newTeacher.passwordSalt)

            if(await this.teacherRepository.save(newTeacher)){
                
                return responseCreatedUpdated(MESSAGES.TEACHER_SERVICE.CREATED)
            }
    
        } catch (error) {
            
            console.log(error)
            return responseBadRequest(error.detail || JSON.stringify(error) || 'Server Error');
            
        }
    }

    async getTeacherData(id: number){
        try {
            const TEACHER_DATA = await this.teacherRepository.findOne({ id: id });

            if(TEACHER_DATA){

                const FILTERED_TEACHER_DATA = removePasswordField(TEACHER_DATA)
                return responseOk(MESSAGES.TEACHER_SERVICE.SUCCESS_FETCHED, FILTERED_TEACHER_DATA);

            } else {
                return responseNotFound(MESSAGES.TEACHER_SERVICE.NOT_FOUND)
            }
            
        } catch (error) {

            console.log(error)
            return responseBadRequest(error.detail || JSON.stringify(error) || 'Server Error');

        }
    }

    async getAllTeachers(limit: string){
        try {
            
            const ALL_TEACHER_DATA = await this.teacherRepository.find({
                order: {
                    updatedAt: "DESC",
                },
                skip: 0,
                take: limit ? parseInt(limit) : 0,
            });

            if(ALL_TEACHER_DATA){

                const FILTERED_TEACHER_DATA = removePasswordField(ALL_TEACHER_DATA)
                
                return responseOk(MESSAGES.TEACHER_SERVICE.SUCCESS_FETCHED, FILTERED_TEACHER_DATA);

            } else {
                return responseNotFound(MESSAGES.TEACHER_SERVICE.NOT_FOUND)
            }
            
        } catch (error) {   

            console.log(error)
            return responseBadRequest(error.detail || JSON.stringify(error) || 'Server Error');

        }
    }

    async updateTeacher(updateTeacherDto: UpdateTeacherDto) {
        try {

            if(await this.teacherRepository.save(updateTeacherDto)){
                
                return responseCreatedUpdated(MESSAGES.TEACHER_SERVICE.UPDATED, undefined, true)
            }
    
        } catch (error) {
            
            console.log(error)
            return responseBadRequest(error.detail || JSON.stringify(error) || 'Server Error');
        }
    }

    async deleteTeacher(id: number){
        try {
            
            const DELETE_TEACHER_DATA = await this.teacherRepository.delete({id: id});

            if(DELETE_TEACHER_DATA && DELETE_TEACHER_DATA.affected !== 0){
                
                return responseOk(MESSAGES.TEACHER_SERVICE.DELETED, DELETE_TEACHER_DATA);

            } else {
                return responseNotFound(MESSAGES.TEACHER_SERVICE.NOT_FOUND)
            }
            
        } catch (error) {
            console.log(error)
            return responseBadRequest(error.detail || JSON.stringify(error) || 'Server Error');
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string>{
        return bcrypt.hash(password, salt)
    }
}
