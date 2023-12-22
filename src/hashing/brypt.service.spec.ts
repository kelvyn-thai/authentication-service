import { Test, TestingModule } from '@nestjs/testing';
import { BcryptService } from './brypt.service';

describe('BcryptService', () => {
  let service: BcryptService;
  let bcryptService: BcryptService;
  beforeEach(async () => {
    bcryptService = new BcryptService();
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptService],
    }).compile();

    service = module.get<BcryptService>(BcryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a string when hash data', async () => {
    const hash = await bcryptService.hash('something_magic');
    expect(typeof hash).toBe('string');
  });

  it('should return true when hash and compare with right data', async () => {
    const pass = 'my_password';
    const hash = await bcryptService.hash(pass);
    const isCorrectPassword = await bcryptService.compare('my_password', hash);
    expect(isCorrectPassword).toBeTruthy();
  });
});
