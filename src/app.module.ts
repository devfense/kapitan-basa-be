import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({ 
       type: 'postgres',
       url: process.env.DATABASE_URL,
       host: process.env.POSTGRES_HOST,
       port: parseInt(<string>process.env.POSTGRES_PORT),
       username: process.env.POSTGRES_USER,
       password: process.env.POSTGRES_PASSWORD,
       database: process.env.POSTGRES_DATABASE,
       autoLoadEntities: true,
      //  //REMOVE THIS IN PRODUCTION
       synchronize: true,

    }),
    StudentModule,
    AdminModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
