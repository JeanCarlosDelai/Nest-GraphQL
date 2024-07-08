import { User } from 'src/modules/user/infra/entities/user.entity';

export class MockUtils {
  static validUser(): User {
    const user: User = {
      id: '1',
      name: 'jean',
      email: 'teste@gmail.com',
      password: '123456',
      created_at: new Date(),
      updated_at: new Date(),
    };
    return user;
  }
}
