import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SkillService } from '../skill/skill.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  // Todo :  Do What you want
  const skillService = app.get(SkillService);
  const skills = await skillService.findAll();
  console.log('Je vais faire un seed de la base de données ');
  console.log(skills);

  await app.close();
}
bootstrap();
