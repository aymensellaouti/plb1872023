import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SkillService } from '../skill/skill.service';
import {
  randEmail,
  randJobTitle,
  randNumber,
  randPassword,
  randUserName,
} from '@ngneat/falso';
import { Skill } from '../skill/entities/skill.entity';
import { User } from '../user/entities/user.entity';
import { Cv } from '../cv/entities/cv.entity';
import { UserService } from '../user/user.service';
import { CvService } from '../cv/cv.service';
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  // Todo :  Do What you want

  const skillService = app.get(SkillService);
  const userService = app.get(UserService);
  const cvService = app.get(CvService);
  console.log('Generate Skills');
  for (let i = 0; i < 10; i++) {
    const skill = new Skill();
    skill.designation = randJobTitle();
    await skillService.create(skill);
  }
  const skills = await skillService.findAll();
  console.log('End Skills generation');
  console.log('Generate Users');
  for (let i = 0; i < 10; i++) {
    const user = new User();
    user.username = randUserName();
    user.email = randEmail();
    user.password = randPassword();
    await userService.create(user);
  }
  const users = await userService.findAll();
  console.log('End Users generation');
  console.log('Generate Cvs');
  for (let i = 0; i < 10; i++) {
    const cv = new Cv();
    cv.age = randNumber({ min: 18, max: 62 });
    cv.job = randJobTitle();
    cv.path = `Path${i}`;
    cv.user = users[i];
    cv.skills = [];
    for (let j = 0; j < 3; j++) {
      cv.skills.push(skills[j]);
    }
    await cvService.create(cv);
  }
  console.log('End CV generation');
  await app.close();
}
bootstrap();
