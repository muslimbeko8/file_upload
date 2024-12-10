import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { InjectModel } from '@nestjs/sequelize';
import { File } from './videos.model';

@Injectable()
export class VideosService {
  constructor(@InjectModel(File) private readonly videoModel: typeof File) {}
  create(createVideoDto: CreateVideoDto) {
    this.videoModel.create(createVideoDto);

    return `http://localhost:3000/static/${createVideoDto.file}`;
  }

  findAll() {
    return this.videoModel.findAll();
  }

  findOne(id: number) {
    return this.videoModel.findByPk(id);
  }

  async update(id: number, updateVideoDto) {
    const [updated] = await this.videoModel.update(updateVideoDto, {
      where: { id },
    });
    if (updated === 0) {
      throw new NotFoundException(`video with ID ${id} not found`);
    }
    return await this.findOne(id);
  }

  remove(id: number) {
    return this.videoModel.destroy({ where: { id } });
  }
}
