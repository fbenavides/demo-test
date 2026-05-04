import { UserController } from './user.controller';
import { UserService } from '../service/user.service';

describe('UserController', () => {
  let controller: UserController;
  let mockUserService: jest.Mocked<UserService>;

  beforeEach(() => {
    mockUserService = {
      create: jest.fn(),
      findAll: jest.fn(),
    } as unknown as jest.Mocked<UserService>;

    controller = new UserController(mockUserService);
  });

  it('debería crear un usuario', async () => {
    const body = {
      name: 'Fernando',
      email: 'fernando@test.com',
      password: '123456',
    };

    const createdUser = {
      id: 1,
      ...body,
    };

    mockUserService.create.mockResolvedValue(createdUser);

    const result = await controller.create(body);

    expect(result).toEqual(createdUser);
    expect(mockUserService.create).toHaveBeenCalledWith(body);
  });

  it('debería listar todos los usuarios', async () => {
    const users = [
      {
        id: 1,
        name: 'Fernando',
        email: 'fernando@test.com',
        password: '123456',
      },
    ];

    mockUserService.findAll.mockResolvedValue(users);

    const result = await controller.findAll();

    expect(result).toEqual(users);
    expect(mockUserService.findAll).toHaveBeenCalled();
  });

  
});