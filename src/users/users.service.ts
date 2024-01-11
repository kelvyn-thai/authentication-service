import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { HashingService } from '@src/hashing/hashing.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FindOneByDto } from './dto/find-one-by.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<number> {
    try {
      const { password, ...rest } = createUserDto;
      console.log('createUserDto', createUserDto);
      const user = plainToClass(User, {
        ...rest,
        password: await this.hashingService.hash(password),
      });
      console.log('user', user);
      const saved = await this.userRepository.save(user);
      console.log('saved', saved);
      if (!saved) {
        throw new BadRequestException('Something bad happended', {
          cause: new Error(),
          description: 'Some error description',
        });
      }
      return saved.id;
    } catch (err) {
      const pgUniqueViolationErrorCode = '23505';
      if (err.code === pgUniqueViolationErrorCode) {
        throw new ConflictException();
      }
      throw err;
    }
    // return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneBy(findOneByDTO: FindOneByDto): Promise<User | null> {
    try {
      const user = await this.userRepository.findOneBy({
        email: findOneByDTO.email,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
