import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function main() {
  const app = await NestFactory.create(AppModule);
  const server = await app.listen(parseInt(process.env.PORT));
  server.setTimeout(900000)
}
main();
