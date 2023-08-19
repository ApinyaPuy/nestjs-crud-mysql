import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePhotoDto } from 'src/dto/create-photo.dto';
import { Photo } from 'src/entity/photo.entity';
import { UsersService } from 'src/service/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
    private usersService: UsersService
  ) {}

  async createPhoto(photo: CreatePhotoDto){
    const userFound = await this.usersService.findUserOne(photo.userjoinId);

    if (!userFound)
      return new HttpException('User not found', HttpStatus.NOT_FOUND);

    const newPhoto = this.photoRepository.create(photo);
    return this.photoRepository.save(newPhoto);
  }

  getPhoto(){
    return this.photoRepository.find({
      relations: ['userjoin'],
    });
  }

}