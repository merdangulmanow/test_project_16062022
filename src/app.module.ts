import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { UserModel } from './users/user.model';
import { PostModel } from './posts/posts.model';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath : '.env'
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      timezone: "+05:00",
      models: [UserModel, PostModel],
      autoLoadModels : true,
      synchronize : true, 
      logging : false
    }),
    UsersModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
