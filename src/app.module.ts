import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './modules/user.service';
import { UserController } from './modules/user.controller';
import { AppDataSource } from './data-source'; // Импортируйте ваш DataSource
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // Загружаем переменные окружения из .env файла
    TypeOrmModule.forRoot(AppDataSource.options), // Используйте параметры из вашего DataSource
    TypeOrmModule.forFeature([User]), // Импортируем репозиторий для сущности User
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
