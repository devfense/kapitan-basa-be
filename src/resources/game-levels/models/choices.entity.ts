import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { QuestionEntity } from './questions.entity'
@Entity('choices_tb')
export class ChoicesEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => QuestionEntity, question => question.choices) 
    question: QuestionEntity;

    @Column({ name: 'choice_letter', nullable: false, type: 'varchar', length: 1 })
    choiceLetter: string;

    @Column({ name: 'choice_description', nullable: false, type: 'varchar', length: 350 })
    choiceDescription: string;

    
}