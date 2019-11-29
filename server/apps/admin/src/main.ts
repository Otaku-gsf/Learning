import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 加载静态资源 须先指定应用类型 这里为NestExpressApplication
  app.useStaticAssets('uploads', {
    prefix: '/uploads',
  });

  // 解决跨域问题
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('学习的视频网站后台API')
    .setDescription('供后台使用的服务端API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
  console.log('http://localhost:3000/api-docs');
}
bootstrap();
