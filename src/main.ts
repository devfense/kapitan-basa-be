import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')
  app.enableCors();
  
  const config = new DocumentBuilder()
    .setTitle('Kapitan Basa Backend API')
    .setDescription('This is the backend api for kapitan basa')
    .setVersion('1.0')
    .addTag('kapitanbasa')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
