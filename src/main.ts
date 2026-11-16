import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Serve the game page (public/index.html)
  app.useStaticAssets(join(process.cwd(), 'public'));

  // STEP 1: turn on DTO validation here (also import ValidationPipe):
  // app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.PORT ?? 3000);
  console.log('Dungeon Clicker · Technovas: http://localhost:3000');
}
bootstrap();
