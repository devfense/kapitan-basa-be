import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './resources/admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './resources/student/student.module';
import { TeacherModule } from './resources/teacher/teacher.module';
import { UsersModule } from './resources/users/users.module';
import { GameLevelsModule } from './resources/game-levels/game-levels.module';




@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({ 
       type: 'postgres',
       //url: process.env.DATABASE_URL,    //HEROKU POSTGRESS
       host: process.env.POSTGRES_HOST,
       port: parseInt(<string>process.env.POSTGRES_PORT),
       username: process.env.POSTGRES_USER,
       password: process.env.POSTGRES_PASSWORD,
       database: process.env.POSTGRES_DATABASE,
       autoLoadEntities: true,
       //REMOVE THIS IN PRODUCTION
       synchronize: true,

    }),
    StudentModule,
    TeacherModule,
    UsersModule,
    AdminModule,
    GameLevelsModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
