import { Module } from '@nestjs/common';
import { PhotoController } from '../controller/photo.controller';
import { PhotoService } from 'src/service/photo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from 'src/entity/photo.entity';
import { UsersModule } from 'src/module/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), UsersModule],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
