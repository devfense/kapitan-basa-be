import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt'

@Entity('admin_tb')
export class AdminPostEntity { 
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'first_name', nullable: false, type: 'varchar', length: 50})
    firstName: string;
    
    @Column({ name: 'middle_name', type: 'varchar', length: 50})
    middleName: string;

    @Column({ name: 'last_name', nullable: false, type: 'varchar', length: 50})
    lastName: string;

    @Column({ name: 'suffix', type: 'varchar', length: 50})
    suffix: string;

    @Column({ name: 'contact',  nullable: false, type: 'varchar', length: 11, unique: true})
    contact: string;

    @Column({ name: 'email_address',  nullable: false, type: 'varchar', length: 50, unique: true})
    emailAddress: string;

    @Column({ name: 'username', nullable: false, type: 'varchar', length: 30, unique: true })
    username: string;

    @Column({ name: 'password', nullable: false, type: 'varchar', select: false })
    password: string;

    @Column({ name: 'password_salt', nullable: false, type: 'varchar', select: false })
    passwordSalt: string;

    @CreateDateColumn({ type: 'timestamptz' })    
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @Column({ name: 'last_updated_by', type: 'varchar', length: 30, default: 'BACKEND' })
    lastUpdatedBy: string;

    private async hashPassword(password: string, salt: string): Promise<string>{
        return bcrypt.hash(password, salt)
    }

}