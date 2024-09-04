import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

enum Gender {
  female = 'female',
  male = 'male,',
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  age: number;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column()
  problem: boolean;
}
