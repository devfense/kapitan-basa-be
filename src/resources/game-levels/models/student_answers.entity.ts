import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { ChoicesEntity } from "./choices.entity"
import { StudentLevelsEntity } from './student-levels.entity'

@Entity('student_answers_tb')
export class StudentAnswerEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => StudentLevelsEntity, studentLevel => studentLevel.studentAnswers) 
    studentLevel: StudentLevelsEntity;

    @Column({ name: 'story_id', nullable: false, type: 'integer' })
    storyID: number;

    @Column({ name: 'question_id', nullable: false, type: 'integer' })
    questionID: number;

    @Column({ name: 'answerLetter', nullable: false, type: 'varchar', length: 1 })
    answerLetter: string;

    
}