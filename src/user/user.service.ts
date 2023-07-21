import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GenericService } from '../common/service/generic-crud.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';
@Injectable()
export class UserService extends GenericService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    const salt = await genSalt();
    user.password = await hash(user.password, salt);
    let newUser;
    try {
      newUser = this.userRepository.save(user);
    } catch (e) {
      throw new ConflictException(`Le username ou l'email existe déjà`);
    }
    return newUser;
  }

  async findUserWithUsernameOrEmail(identifier: string): Promise<User | null> {
    return await this.userRepository
      .createQueryBuilder('u')
      .where('u.username = :identifier or u.email = :identifier', {
        identifier,
      })
      .getOne();
  }
}
