import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from 'src/modules/user/infra/entities/user.entity';
import { CreateUsersTable1720193324770 } from './migrations/CreateUsersTable-1720193324770-migrations';

export const dataSource = new DataSource({
  type: 'postgres',
  port: Number(process.env.DATABASE_PORT),
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [User],
  migrations: [CreateUsersTable1720193324770],
  synchronize: false,
});
