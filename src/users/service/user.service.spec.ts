import { UserService } from './user.service';
import { UserDao } from './user.dao';

describe('UserService', () => {
  let service: UserService;
  let mockUserDao: jest.Mocked<UserDao>;

  beforeEach(() => {
    mockUserDao = {
      findOneByEmail: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
    } as unknown as jest.Mocked<UserDao>;

    service = new UserService(mockUserDao);
  });

  it('debería crear un usuario si el email no existe', async () => {
    mockUserDao.findOneByEmail.mockResolvedValue(null);

    mockUserDao.save.mockResolvedValue({
      id: 1,
      name: 'Fernando',
      email: 'fernando@test.com',
      password: '123456',
    });

    const result = await service.create({
      name: 'Fernando',
      email: 'fernando@test.com',
      password: '123456',
    });

    expect(result).toEqual({
      id: 1,
      name: 'Fernando',
      email: 'fernando@test.com',
      password: '123456',
    });

    expect(mockUserDao.findOneByEmail).toHaveBeenCalledWith('fernando@test.com');
    expect(mockUserDao.save).toHaveBeenCalledWith({
      name: 'Fernando',
      email: 'fernando@test.com',
      password: '123456',
    });
  });

  it('debería lanzar error si el email ya existe', async () => {
    mockUserDao.findOneByEmail.mockResolvedValue({
      id: 1,
      name: 'Fernando',
      email: 'fernando@test.com',
      password: '123456',
    });

    await expect(
      service.create({
        name: 'Otro Fernando',
        email: 'fernando@test.com',
        password: 'abcdef',
      }),
    ).rejects.toThrow('Email already exists');

    expect(mockUserDao.save).not.toHaveBeenCalled();
  });

  it('debería listar todos los usuarios', async () => {
    mockUserDao.findAll.mockResolvedValue([
      {
        id: 1,
        name: 'Fernando',
        email: 'fernando@test.com',
        password: '123456',
      },
    ]);

    const result = await service.findAll();

    expect(result).toHaveLength(1);
    expect(mockUserDao.findAll).toHaveBeenCalled();
  });
});