import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsers1732373632254 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = [];
    for (let i = 1; i <= 1000000; i++) {
      users.push({
        firstName: `Имя${i}`,
        lastName: `Фамилия${i}`,
        age: Math.floor(Math.random() * (70 - 18 + 1)) + 18,
        gender: Math.random() > 0.5 ? 'male' : 'female',
        hasProblems: Math.random() > 0.5,
      });
    }

    // Вставляем данные партиями
    for (let i = 0; i < users.length; i += 1000) {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('users') // Убедитесь, что имя таблицы корректно
        .values(users.slice(i, i + 1000))
        .execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "users" WHERE "firstName" LIKE 'Имя%' AND "lastName" LIKE 'Фамилия%'`,
    );
  }
}
