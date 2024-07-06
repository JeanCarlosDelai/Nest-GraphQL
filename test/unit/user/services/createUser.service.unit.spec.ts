import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepositoryContract } from 'src/modules/user/domain/contracts/usersRepository.contract';
import { CreateUserInputDto } from 'src/modules/user/domain/dtos/createUserInput.dto';
import { CreateUserService } from 'src/modules/user/services/createUser.service';
import { EMAIL_ALREADY_USED } from 'src/shared/consts/error.consts';
import { MockUtils } from 'test/utils/mockUtils';
import { vi } from 'vitest';

describe('CreateUserServiceUnit', () => {
  let service: CreateUserService;
  let repository: UsersRepositoryContract;

  const mockRepository = {
    findByEmail: vi.fn(),
    create: vi.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: UsersRepositoryContract,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
    repository = module.get<UsersRepositoryContract>(UsersRepositoryContract);
  });

  beforeEach(() => {
    mockRepository.findByEmail.mockReset();
    mockRepository.create.mockReset();
  });

  test('Deve estar definido', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('createUser', () => {
    test('Deve ser possível realizar o cadastro do usuário', async () => {
      const inputData: CreateUserInputDto = {
        name: 'jean',
        email: 'teste@gmail.com',
      };
      const user = MockUtils.validUser();
      mockRepository.findByEmail.mockResolvedValueOnce(null);
      mockRepository.create.mockResolvedValueOnce(user);

      const result = await service.createUser(inputData);

      expect(result).toEqual(user);
    });

    test('Não deve ser possível cadastrar um usuáriocque já tenha sido cadastrado', async () => {
      const inputData: CreateUserInputDto = {
        name: 'jean',
        email: 'teste@gmail.com',
      };
      const user = MockUtils.validUser();
      mockRepository.findByEmail.mockResolvedValueOnce(user);

      await service.createUser(inputData).catch(e => {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e).toMatchObject({
          message: EMAIL_ALREADY_USED,
        });
      });
      expect(mockRepository.findByEmail).toHaveBeenCalledTimes(1);
    });
  });
});
