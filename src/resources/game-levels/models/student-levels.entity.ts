import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { GameLevelsEntity } from './game-levels.entity'
import { StudentAnswerEntity } from './student_answers.entity'


@Entity('student_levels_tb')
export class StudentLevelsEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'student_id', nullable: false, type: 'varchar', length: 15 })
    studentID: string;

    @Column({ name: 'game_level_id', nullable: false, type: 'integer'})
    gameLevelId: number;

    @ManyToOne(type => GameLevelsEntity, {eager: true})
    @JoinColumn({ name: "game_level_id", referencedColumnName: "id" }) 
    gameLevelData: GameLevelsEntity;

    @OneToMany(() => StudentAnswerEntity, answers => answers.studentLevel, {
        cascade: true,
        eager: true 
    })
    studentAnswers: StudentAnswerEntity[];


    @Column({ name: 'level_score', nullable: true, type: 'integer'})
    levelScore: number;

    @Column({ name: 'level_score_summary', nullable: true, type: 'varchar', length: 7 })
    levelScoreSummary: string;

    @Column({ name: 'level_remarks', nullable: true, type: 'varchar', length: 15 })
    levelRemarks: string;

    @Column({ name: 'level_cleared', type: 'boolean', default: false })
    levelCleared: Boolean;

    @CreateDateColumn({ type: 'timestamptz' })    
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @Column({ name: 'last_updated_by', type: 'varchar', length: 30, default: 'BACKEND' })
    lastUpdatedBy: string;
    
}