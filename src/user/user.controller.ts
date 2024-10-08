import { Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/removeflags')
  async removeFlags() {
    return await this.userService.removeFlagsandCount();
  }
}
