import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT : number = Number(process.env.PORT)
  const app = await NestFactory.create(AppModule);
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  app.useGlobalPipes(
    new ValidationPipe({
      transform : true,
      whitelist : true,
      forbidNonWhitelisted : true, 
    })
  )
  
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder().setTitle('Test Project')
                  .setDescription('Documentation of Rest API')
                  .setVersion('1.0.0').addTag('Tag#1').build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  await app.listen(PORT, ()=> {
    console.log(`app started on port ${PORT}`)
  });
}
bootstrap();
