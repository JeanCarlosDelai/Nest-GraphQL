import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepositoryContract } from 'src/modules/user/domain/contracts/usersRepository.contract';
import { FindAllUsersService } from 'src/modules/user/services/findAllUsers.service';
import { MockUtils } from 'test/utils/mockUtils';
import { vi } from 'vitest';

describe('FindAllUsersServiceUnit', () => {
  let service: FindAllUsersService;
  let repository: UsersRepositoryContract;

  const mockRepository = {
    findAll: vi.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllUsersService,
        {
          provide: UsersRepositoryContract,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FindAllUsersService>(FindAllUsersService);
    repository = module.get<UsersRepositoryContract>(UsersRepositoryContract);
  });

  beforeEach(() => {
    mockRepository.findAll.mockReset();
  });

  test('Deve estar definido', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('findAllUsers', () => {
    test('Deve ser possível listar todos os usuários', async () => {
      const user = MockUtils.validUser();
      const users = [user, user];
      mockRepository.findAll.mockResolvedValueOnce(users);

      const result = await service.findAllUsers();

      expect(result).toEqual(users);
      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
