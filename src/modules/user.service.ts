import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async resetUserProblems(): Promise<number> {
    // Считаем количество пользователей с проблемами
    const usersWithProblems = await this.userRepository.count({
      where: { hasProblems: true },
    });

    // Обновляем флаг проблем у всех пользователей
    await this.userRepository.update(
      { hasProblems: true },
      { hasProblems: false },
    );

    return usersWithProblems;
  }
}
