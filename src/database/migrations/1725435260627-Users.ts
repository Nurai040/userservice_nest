import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Gender } from '../entities/user.entity';

export class Users1725435260627 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'surname',
            type: 'varchar',
          },
          {
            name: 'age',
            type: 'int',
          },
          {
            name: 'gender',
            type: 'enum',
            enum: [Gender.female, Gender.male],
          },
          {
            name: 'problem',
            type: 'boolean',
            default: false,
          },
        ],
      }),
    );

    for (let i = 0; i <= 1000000; i++) {
      await queryRunner.query(
        `INSERT INTO users (name, surname, age, gender,problem) VALUES ('Name${i}', 'Surname${i}', ${i % 100}, '${i % 2 === 0 ? 'female' : 'male'}', ${Math.random() > 0.5})`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
