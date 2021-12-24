import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { QuestionEntity } from './questions.entity'
import { GameLevelsEntity } from './game-levels.entity'

@Entity('stories_tb')
export class StoryEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => GameLevelsEntity, gameLevel => gameLevel.stories) 
    gameLevel: GameLevelsEntity;

    @OneToMany(() => QuestionEntity, questions => questions.story, {
        cascade: true,
        eager: true 
    })
    questions: QuestionEntity[];

    @Column({ name: 'story_content', nullable: false, type: 'varchar' })
    storyContent: string;
    
}