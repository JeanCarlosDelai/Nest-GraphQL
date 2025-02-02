import { Module } from '@nestjs/common';
import { DatabaseProvider } from './database.provider';

@Module({
  providers: [DatabaseProvider],
  exports: [DatabaseProvider],
})
// eslint-disable-next-line prettier/prettier
export class DatabaseModule { }
