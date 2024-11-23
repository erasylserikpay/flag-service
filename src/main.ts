import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000; // Получите порт из переменных окружения
  await app.listen(port);
}

bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
});
