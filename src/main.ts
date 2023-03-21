import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // ValidationPipe > whitelist: If true, validator will strip validated (returned) object of any properties that do not use any validation decorators.
  // example: if I add property 'id' to a post body that should be sent to the server, the validator will remove the property from the body
  await app.listen(3000);
}
bootstrap().then((res) => {
  console.log('bootstrap listening on http://localhost:3000', res);
});
