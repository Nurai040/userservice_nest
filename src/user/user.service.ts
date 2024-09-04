import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}

  async removeFlagsandCount() {
    try {
      const count = await this.repo.count({
        where: { problem: true },
      });
      await this.repo.update({ problem: true }, { problem: false });
      const now = await this.repo.find({ where: { problem: true } });
      const res = {
        beforeHadProblem: count,
        nowUsersWithProblem: now,
      };
      return res;
    } catch (error) {
      console.log('Error with removeing flag: ', error);
      throw new HttpException(
        'Server-side Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
