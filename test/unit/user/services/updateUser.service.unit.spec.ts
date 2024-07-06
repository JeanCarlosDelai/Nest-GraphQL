import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepositoryContract } from 'src/modules/user/domain/contracts/usersRepository.contract';
import { UpdateUserInputDto } from 'src/modules/user/domain/dtos/updateUserInput.dto';
import { UpdateUserService } from 'src/modules/user/services/updateUser.service';
import {
  EMAIL_ALREADY_USED,
  USER_NOT_FOUND,
} from 'src/shared/consts/error.consts';
import { MockUtils } from 'test/utils/mockUtils';
import { vi } from 'vitest';

describe('UpdateUserServiceUnit', () => {
  let service: UpdateUserService;
  let repository: UsersRepositoryContract;

  const mockRepository = {
    findById: vi.fn(),
    findByEmail: vi.fn(),
    update: vi.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserService,
        {
          provide: UsersRepositoryContract,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UpdateUserService>(UpdateUserService);
    repository = module.get<UsersRepositoryContract>(UsersRepositoryContract);
  });

  beforeEach(() => {
    mockRepository.findById.mockReset();
    mockRepository.findByEmail.mockReset();
    mockRepository.update.mockReset();
  });

  test('Deve estar definido', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('UpdateUser', () => {
    test('Deve ser possível atualizar o cadastro do usuário', async () => {
      const id = '1';
      const inputData: UpdateUserInputDto = {
        name: 'jean',
        email: 'teste@gmail.com',
      };
      const user = MockUtils.validUser();
      mockRepository.findById.mockResolvedValueOnce(user);
      mockRepository.findByEmail.mockResolvedValueOnce(null);
      user.name = inputData.name;
      user.email = inputData.email;
      mockRepository.update.mockResolvedValueOnce(user);

      const result = await service.updateUser(id, inputData);

      expect(result).toEqual(user);
      expect(mockRepository.findById).toHaveBeenCalledTimes(1);
      expect(mockRepository.findByEmail).toHaveBeenCalledTimes(1);
      expect(mockRepository.update).toHaveBeenCalledTimes(1);
    });

    test('Não deve ser possível atualizar um usuário se for passado um id inválido', async () => {
      const id = 'invalid';
      const inputData: UpdateUserInputDto = {
        name: 'jean',
        email: 'teste@gmail.com',
      };
      mockRepository.findById.mockResolvedValueOnce(null);

      await service.updateUser(id, inputData).catch(e => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({
          message: USER_NOT_FOUND,
        });
      });
      expect(mockRepository.findById).toHaveBeenCalledTimes(1);
    });

    test('Não deve ser possível atualizar o e-mail do usuário se já estiver um usuário cadastrado com este e-mail', async () => {
      const id = '1';
      const inputData: UpdateUserInputDto = {
        name: 'jean',
        email: 'teste@gmail.com',
      };
      const user = MockUtils.validUser();
      mockRepository.findById.mockResolvedValueOnce(user);
      mockRepository.findByEmail.mockResolvedValueOnce(user);

      await service.updateUser(id, inputData).catch(e => {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e).toMatchObject({
          message: EMAIL_ALREADY_USED,
        });
      });
      expect(mockRepository.findById).toHaveBeenCalledTimes(1);
      expect(mockRepository.findByEmail).toHaveBeenCalledTimes(1);
    });
  });
});
