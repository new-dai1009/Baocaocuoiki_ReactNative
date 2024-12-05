import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
    // Cấu hình CORS
    const corsOptions: CorsOptions = {
      origin: 'http://localhost:8081',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, 
    };
    
    app.enableCors(corsOptions);
  await app.listen(3000);
}
bootstrap();
