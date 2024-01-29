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
import { Role } from './enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<string> {
    try {
      const { password, ...rest } = createUserDto;
      const user = plainToClass(User, {
        ...rest,
        password: await this.hashingService.hash(password),
      });
      const saved = await this.userRepository.save(user);
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

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    try {
      return await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException();
    }
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

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async updateRole(id: string, role: Role) {
    try {
      await this.userRepository.update({ id }, { role });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
