import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreatePhotoDto } from '../dto/create-photo.dto';
import { PhotoService } from '../service/photo.service';

@Controller('photo')
export class PhotoController {
  constructor(private photoService: PhotoService) {}

  @Post('/createPhoto')
  createPhoto(@Body() nwePhoto: CreatePhotoDto) {
    return this.photoService.createPhoto(nwePhoto);
  }

  @Get('/getPhoto')
  getPhoto() {
    return this.photoService.getPhoto();
  }
}
