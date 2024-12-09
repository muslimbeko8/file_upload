import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Videos } from './videos.model';

@Module({
  imports: [SequelizeModule.forFeature([Videos])],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
