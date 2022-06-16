import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize/dist';
import { PostsController } from './posts.controller';
import { PostModel } from './posts.model';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    SequelizeModule.forFeature([
      PostModel
    ]),
  ]
})
export class PostsModule {}
