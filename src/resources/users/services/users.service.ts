import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProcessUserDto, LoginUserDto } from '../users.dto'
//TEACHER ENTITY
import { TeacherEntity } from '../../teacher/models/teacher.entity';
//STUDENT ENTITY
import { StudentPostEntity } from '../../student/models/student.entity';
//STUDENT ENTITY
import { AdminPostEntity } from '../../admin/models/admin.entity';



import * as bcrypt from 'bcrypt'

//Constants
import { MESSAGES } from '../../../constants/messages'

//Helpers
import { responseOk, responseCreatedUpdated, responseNotFound, responseBadRequest, removePasswordField } from '../../../helpers/Helpers'

@Injectable()
export class UsersService {
    constructor(
       @InjectRepository(TeacherEntity)
       private readonly teacherRepository: Repository<TeacherEntity>,

       @InjectRepository(StudentPostEntity)
       private readonly studentRepository: Repository<StudentPostEntity>,

       @InjectRepository(AdminPostEntity)
       private readonly adminRepository: Repository<AdminPostEntity>


    ){}


    async getAllUsers(limit: string){
        try {
            
            let ALL_STUDENT_DATA = await this.studentRepository.find({
                order: {
                    updatedAt: "DESC",
                },
                skip: 0,
            });

            let ALL_TEACHER_DATA = await this.teacherRepository.find({
                order: {
                    updatedAt: "DESC",
                },
                skip: 0,
            });

            //APPEND ACCOUNT TYPE
            ALL_STUDENT_DATA = ALL_STUDENT_DATA.length > 0 ? ALL_STUDENT_DATA.map((data) => {
                   let users = data
                   users['accountType'] = 'STUDENT'
                   return users
            }) : []
            
            ALL_TEACHER_DATA = ALL_TEACHER_DATA.length > 0 ? ALL_TEACHER_DATA.map((data) => {
                let users = data
                users['accountType'] = 'TEACHER'
                return users
            }) : []


            let ALL_USERS_DATA = [...ALL_STUDENT_DATA, ...ALL_TEACHER_DATA]

            if(ALL_USERS_DATA.length > 0){

                //REMOVE PASSWORD AND APPLY LIMIT
                let FILTERED_USERS_DATA = removePasswordField(ALL_USERS_DATA).slice(0, (parseInt(limit) ? parseInt(limit) : ALL_USERS_DATA.length))
                
                return responseOk(MESSAGES.USERS_SERVICE.SUCCESS_FETCHED, FILTERED_USERS_DATA);

            } else {
                return responseNotFound(MESSAGES.USERS_SERVICE.NOT_FOUND)
            }
            
        } catch (error) {   

            console.log(error)
            return responseBadRequest(error.detail || JSON.stringify(error) || 'Server Error');

        }
    }


    async processUser(processUser: ProcessUserDto){
        try {
            
            const { username, action } = processUser

            let STUDENT_TO_PROCESS = await this.studentRepository.findOne({ username: username });

            let TEACHER_TO_PROCESS = !STUDENT_TO_PROCESS ? await this.teacherRepository.findOne({ username: username }) : null;

            if(STUDENT_TO_PROCESS){

                STUDENT_TO_PROCESS.status = action

                if(await this.studentRepository.save(STUDENT_TO_PROCESS)){

                    return responseCreatedUpdated(( action === 'APPROVED' ? MESSAGES.USERS_SERVICE.PROCESS_APPROVE : MESSAGES.USERS_SERVICE.PROCESS_REJECT), undefined, true)
                
                } 

            } else if(TEACHER_TO_PROCESS) {

                TEACHER_TO_PROCESS.status = action

                if(await this.teacherRepository.save(TEACHER_TO_PROCESS)){

                    return responseCreatedUpdated(( action === 'APPROVED' ? MESSAGES.USERS_SERVICE.PROCESS_APPROVE : MESSAGES.USERS_SERVICE.PROCESS_REJECT), undefined, true)
                
                } 

            } else {
                return responseNotFound(MESSAGES.USERS_SERVICE.PROCESS_CANNOT_FIND_USER)
            }
            
        } catch (error) {   

            console.log(error)
            return responseBadRequest(error.detail || JSON.stringify(error) || 'Server Error');

        }
    }

    async authenticateUser(userCredentials: LoginUserDto){
        try {
            const { username, password } = userCredentials

            let STUDENT_AUTH = await this.studentRepository.findOne({ username })
            let TEACHER_AUTH = !STUDENT_AUTH ? await this.teacherRepository.findOne({ username }) : null
            let ADMIN_AUTH = !TEACHER_AUTH && !STUDENT_AUTH ? await this.adminRepository.findOne({ username }) : null

            

            if (STUDENT_AUTH && await STUDENT_AUTH.validatePassword(password)) {

                
                let FILTERED_STUDENT_DATA = removePasswordField(STUDENT_AUTH)

                return responseOk(MESSAGES.USERS_SERVICE.AUTH_SUCCESS, FILTERED_STUDENT_DATA);

            } else if (TEACHER_AUTH && await TEACHER_AUTH.validatePassword(password)) {

                let FILTERED_TEACHER_DATA = removePasswordField(TEACHER_AUTH)

                return responseOk(MESSAGES.USERS_SERVICE.AUTH_SUCCESS, FILTERED_TEACHER_DATA);


            } else if (ADMIN_AUTH && await ADMIN_AUTH.validatePassword(password)) {

                let FILTERED_ADMIN_DATA = removePasswordField(ADMIN_AUTH)

                return responseOk(MESSAGES.USERS_SERVICE.AUTH_SUCCESS, FILTERED_ADMIN_DATA);


            } else {
                return responseNotFound(MESSAGES.USERS_SERVICE.AUTH_INVALID_CREDENTIALS)
            }
            
        } catch (error) {

            console.log(error)
            return responseBadRequest(error.detail || 'Server Error');

        }

    }





}
