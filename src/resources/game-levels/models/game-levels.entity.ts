import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { StoryEntity } from './stories.entity'

@Entity('game_levels_tb')
export class GameLevelsEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => StoryEntity, stories => stories.gameLevel, {
        cascade: true,
        eager: true 
    })
    stories: StoryEntity[];

    @Column({ name: 'level_name', nullable: false, type: 'varchar', length: 50, unique: true })
    levelName: string;

    @Column({ name: 'level_title', nullable: false, type: 'varchar', length: 50 })
    levelTitle: string;

    @Column({ name: 'level_description', nullable: false, type: 'varchar', length: 250 })
    levelDescription: string;

    @Column({ name: 'level_bg_img_url', nullable: true, type: 'varchar', length: 300 })
    levelBgImgUrl: string;

    @CreateDateColumn({ type: 'timestamptz' })    
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    @Column({ name: 'last_updated_by', type: 'varchar', length: 30, default: 'BACKEND' })
    lastUpdatedBy: string;
    
}