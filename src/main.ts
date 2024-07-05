import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './shared/config/config';
import { Logger, ValidationPipe } from '@nestjs/common';
const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, disableErrorMessages: false })
  );
  await app.listen(config.PORT);
  logger.log(`API Nest-GrapghQl it ruuning: ${config.PORT}`);
}
bootstrap();
