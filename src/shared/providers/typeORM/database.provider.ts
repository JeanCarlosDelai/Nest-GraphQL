import { User } from 'src/modules/user/infra/entities/user.entity';
import { DataSource } from 'typeorm';
import 'dotenv/config';
import { CreateUsers } from './migrations/createUsers.migration';

export const DatabaseProvider = {
  provide: 'DATA_SOURCE',
  useFactory: async () => {
    const dataSource = new DataSource({
      type: 'postgres',
      port: Number(process.env.DATABASE_PORT),
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [User],
      migrations: [CreateUsers],
      synchronize: false,
    });

    return dataSource.initialize();
  },
};
