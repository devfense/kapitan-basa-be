import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt'

@Entity('student_tb')
export class StudentPostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'student_id', nullable: false, type: 'varchar', length: 15, unique: true })
    studentID: string;

    @Column({ name: 'first_name', nullable: false, type: 'varchar', length: 50 })
    firstName: string;

    @Column({ name: 'middle_name', nullable: true, type: 'varchar', length: 50 })
    middleName: string;

    @Column({ name: 'last_name', nullable: false, type: 'varchar', length: 50 })
    lastName: string;

    @Column({ name: 'suffix', nullable: true, type: 'varchar', length: 5 })
    suffix: string;
    
    @Column({ name: 'grade', nullable: false, type: 'varchar', length: 5 })
    grade: string;

    @Column({ name: 'section', nullable: false, type: 'varchar', length: 20 })
    section: string;

    @Column({ name: 'username', nullable: false, type: 'varchar', length: 30, unique: true })
    username: string;

    @Column({ name: 'email_address', nullable: false, type: 'varchar', length: 50, unique: true })
    emailAddress: string;


    @Column({ name: 'password', nullable: false, type: 'varchar'})
    password: string;

    @Column({ name: 'password_salt', nullable: false, type: 'varchar'})
    passwordSalt: string;


    @Column({ name: 'status', type: 'varchar', length: 10, default: 'PENDING' })
    status: string;

    @CreateDateColumn({ type: 'timestamptz' })    
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @Column({ name: 'last_updated_by', type: 'varchar', length: 30, default: 'BACKEND' })
    lastUpdatedBy: string;
    

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.passwordSalt)
        return hash === this.password
    }
}