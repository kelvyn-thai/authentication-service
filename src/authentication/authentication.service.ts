import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingService } from 'src/hashing/hashing.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      const user = new User();
      user.email = signUpDto.email;
      user.password = await this.hashingService.hash(signUpDto.password);
      user.username = signUpDto.email;
      const record = await this.usersRepository.save(user);
      console.log('record', record);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException();
      }
      throw error;
    }
  }

  async signIn(signInDto: SignInDto) {
    try {
      console.log('signInDto', signInDto);
      const user = await this.usersRepository.findOneBy({
        email: signInDto.email,
      });
      if (!user) {
        throw new UnauthorizedException('User does not exists');
      }
      const isEqual = await this.hashingService.compare(
        signInDto.password,
        user.password,
      );
      if (!isEqual) {
        throw new UnauthorizedException('Password does not match!');
      }
    } catch (error) {
      throw error;
    }
    return true;
  }
}
