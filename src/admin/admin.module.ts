import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './controllers/admin.controller';
import { AdminPostEntity } from './models/admin.entity';
import { AdminService } from './services/admin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminPostEntity])
  ],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}