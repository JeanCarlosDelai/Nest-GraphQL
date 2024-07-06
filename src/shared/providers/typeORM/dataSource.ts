import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from 'src/modules/user/infra/entities/user.entity';
import { CreateUsersTable1720193324770 } from './migrations/CreateUsersTable-1720193324770-migrations';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
  migrations: [CreateUsersTable1720193324770],
  synchronize: false,
});
