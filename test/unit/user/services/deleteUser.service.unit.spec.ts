import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepositoryContract } from 'src/modules/user/domain/contracts/usersRepository.contract';
import { DeleteUserService } from 'src/modules/user/services/deleteUser.service';
import { USER_NOT_FOUND } from 'src/shared/consts/error.consts';
import { MockUtils } from 'test/utils/mockUtils';
import { vi } from 'vitest';

describe('DeleteUserServiceUnit', () => {
  let service: DeleteUserService;
  let repository: UsersRepositoryContract;

  const mockRepository = {
    findById: vi.fn(),
    remove: vi.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserService,
        {
          provide: UsersRepositoryContract,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DeleteUserService>(DeleteUserService);
    repository = module.get<UsersRepositoryContract>(UsersRepositoryContract);
  });

  beforeEach(() => {
    mockRepository.findById.mockReset();
    mockRepository.remove.mockReset();
  });

  test('Deve estar definido', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('deleteUser', () => {
    test('Deve ser possível excluir um usuário', async () => {
      const id = '1';
      const user = MockUtils.validUser();
      mockRepository.findById.mockResolvedValueOnce(user);
      mockRepository.remove.mockResolvedValueOnce(true);

      const result = await service.deleteUser(id);

      expect(result).toEqual(true);
      expect(mockRepository.findById).toHaveBeenCalledTimes(1);
      expect(mockRepository.remove).toHaveBeenCalledTimes(1);
    });

    test('Não deve ser possível excluir um usuário', async () => {
      const id = 'invalid';
      mockRepository.findById.mockResolvedValueOnce(null);

      await service.deleteUser(id).catch(e => {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e).toMatchObject({
          message: USER_NOT_FOUND,
        });
      });
      expect(mockRepository.findById).toHaveBeenCalledTimes(1);
    });
  });
});
