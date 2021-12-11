import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AdminPostEntity } from "../models/admin.entity";
import { RegisterAdminDto } from "../models/dto/register-admin.dto";

import * as bcrypt from 'bcrypt'
import { Equal } from "typeorm";


//Constants
import { MESSAGES } from '../../constants/messages'

//Helpers
import { responseOk, responseCreatedUpdated, responseNotFound, responseBadRequest } from '../../helpers/Helpers'
import { UpdateAdminDto } from "../models/dto/update-admin.dto";

@Injectable()
export class AdminService { 
    constructor(
        @InjectRepository(AdminPostEntity)
        private readonly adminPostRepository: Repository<AdminPostEntity>
    ) { }
    
    async createAdmin(createAdminDto: RegisterAdminDto) { 
        try { 
            const { 
                firstName,
                middleName,
                lastName,
                suffix,
                contact,
                username,
                emailAddress,
                password
            } = createAdminDto

            const newAdmin = new AdminPostEntity()

            newAdmin.firstName = firstName;
            newAdmin.middleName = middleName;
            newAdmin.lastName = lastName;
            newAdmin.suffix = suffix;
            newAdmin.contact = contact;
            newAdmin.username = username;
            newAdmin.emailAddress = emailAddress;

             //DO SOME PASSWORD ENCRPYTION
             newAdmin.passwordSalt = await bcrypt.genSalt()
             newAdmin.password = await this.hashPassword(password, newAdmin.passwordSalt)
 
             if(await this.adminPostRepository.save(newAdmin)){
                 
                 return responseCreatedUpdated(MESSAGES.ADMIN_SERVICE.CREATED)
            } 
        }catch (error) {
            
            console.log(error)
            return responseBadRequest(error.detail);
        }
    } 

    async getAdminData(id: number) {
        try {
            const ADMIN_DATA = await this.adminPostRepository.findOne({ id: id });
            
            if(ADMIN_DATA){
                
                return responseOk(MESSAGES.ADMIN_SERVICE.SUCCESS_FETCHED, ADMIN_DATA);

            } else {
                return responseNotFound(MESSAGES.ADMIN_SERVICE.NOT_FOUND)
            }
            
         } catch (error) {
            
            return responseBadRequest(error.detail);
        }

    }

    async getAllAdmin(limit: string){
        try {
            
            const ALL_ADMIN_DATA = await this.adminPostRepository.find({
                order: {
                    updatedAt: "DESC",
                },
                skip: 0,
                take: limit ? parseInt(limit) : 0,
            });

            if(ALL_ADMIN_DATA){
                
                return responseOk(MESSAGES.ADMIN_SERVICE.SUCCESS_FETCHED, ALL_ADMIN_DATA);

            } else {
                return responseNotFound(MESSAGES.ADMIN_SERVICE.NOT_FOUND)
            }
            
        } catch (error) {

            
            return responseBadRequest(error.detail);
        }
    }

    async updateAdmin(updateAdminDto: UpdateAdminDto) {
        try {

            if(await this.adminPostRepository.save(updateAdminDto)){
                
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