import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentPostEntity } from '../models/student.entity';
import { RegisterStudentDto } from '../models/dto/register-student.dto';
import { UpdateStudentDto } from '../models/dto/update-student.dto';

import * as bcrypt from 'bcrypt'
import { Equal } from "typeorm";


//Constants
import { MESSAGES } from '../../constants/messages'

//Helpers
import { responseOk, responseCreatedUpdated, responseNotFound, responseBadRequest } from '../../helpers/Helpers'

@Injectable()
export class StudentService {
    constructor(
       @InjectRepository(StudentPostEntity)
       private readonly studentPostRepository: Repository<StudentPostEntity>
    ){}

    async createStudent(createStudentDto: RegisterStudentDto) {
        try {
            const { 
                studentID,
                firstName,
                lastName,
                grade,
                section,
                username,
                emailAddress,
                password
            } = createStudentDto

            const newStudent = new StudentPostEntity()

            newStudent.studentID = studentID;
            newStudent.firstName = firstName;
            newStudent.lastName = lastName;
            newStudent.grade = grade;
            newStudent.section = section;
            newStudent.username = username;
            newStudent.emailAddress = emailAddress;

            //DO SOME PASSWORD ENCRPYTION
            newStudent.passwordSalt = await bcrypt.genSalt()
            newStudent.password = await this.hashPassword(password, newStudent.passwordSalt)

            if(await this.studentPostRepository.save(newStudent)){
                
                return responseCreatedUpdated(MESSAGES.STUDENT_SERVICE.CREATED)
            }
    
        } catch (error) {
            
            return responseBadRequest(error.detail);
        }
    }

    async getStudentData(studentID: string){
        try {
            const STUDENT_DATA = await this.studentPostRepository.findOne({ studentID: studentID});

            if(STUDENT_DATA){
                
                return responseOk(MESSAGES.STUDENT_SERVICE.SUCCESS_FETCHED, STUDENT_DATA);

            } else {
                return responseNotFound(MESSAGES.STUDENT_SERVICE.NOT_FOUND)
            }
            
        } catch (error) {

            
            return responseBadRequest(error.detail);
        }
    }

    async getAllStudent(limit: string){
        try {
            
            const ALL_STUDENT_DATA = await this.studentPostRepository.find({
                order: {
                    updatedAt: "DESC",
                },
                skip: 0,
                take: limit ? parseInt(limit) : 0,
            });

            if(ALL_STUDENT_DATA){
                
                return responseOk(MESSAGES.STUDENT_SERVICE.SUCCESS_FETCHED, ALL_STUDENT_DATA);

            } else {
                return responseNotFound(MESSAGES.STUDENT_SERVICE.NOT_FOUND)
            }
            
        } catch (error) {

            
            return responseBadRequest(error.detail);
        }
    }

    async updateStudent(updateStudentDto: UpdateStudentDto) {
        try {

            if(await this.studentPostRepository.save(updateStudentDto)){
                
                return responseCreatedUpdated(MESSAGES.STUDENT_SERVICE.UPDATED, undefined, true)
            }
    
        } catch (error) {
            
            return responseBadRequest(error.detail);
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string>{
        return bcrypt.hash(password, salt)
    }
}
