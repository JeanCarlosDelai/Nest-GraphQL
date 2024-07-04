import { Module } from '@nestjs/common';
import { AppService } from './modules/app.service';
import { AppController } from './modules/app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
// eslint-disable-next-line prettier/prettier
export class AppModule {}
