import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { ChoicesEntity } from "./choices.entity"
import { StoryEntity } from './stories.entity'

@Entity('questions_tb')
export class QuestionEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => StoryEntity, story => story.questions) 
    story: StoryEntity;


    @OneToMany(() => ChoicesEntity, choices => choices.question, {
        cascade: true,
        eager: true 
    })
    choices: ChoicesEntity[];

    @Column({ name: 'question_content', nullable: false, type: 'varchar' })
    questionContent: string;

    @Column({ name: 'question_correct_answer_letter', nullable: false, type: 'varchar', length: 1 })
    questionCorrectAnswerLetter: string;

    
}