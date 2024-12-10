import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { File } from './videos.model';

@Module({
  imports: [SequelizeModule.forFeature([File])],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
