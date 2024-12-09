import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 10000);
    const ext = extname(file.originalname);
    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

@Controller('file')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('video', {
      storage,
    }),
  )
  async create(
    @UploadedFile() video: Express.Multer.File,
    @Body() createVideoDto: CreateVideoDto,
  ) {
    if (!video) {
      throw new BadRequestException('Fayl yuklanmadi');
    }

    createVideoDto.video = video.filename;

    const savedVideo = await this.videosService.create(createVideoDto);

    return savedVideo;
  }

  @Get()
  findAll() {
    return this.videosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videosService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('video', {
      storage,
    }),
  )
  async update(
    @Param('id') id: string,
    @UploadedFile() video: Express.Multer.File,
    @Body() updateVideoDto: UpdateVideoDto,
  ) {
    if (video) {
      updateVideoDto.video = video.filename;
    }

    const updatedVideo = await this.videosService.update(+id, updateVideoDto);

    return updatedVideo;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }
}