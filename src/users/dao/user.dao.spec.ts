import { UserDao } from './user.dao';

describe('UserDao', () => {
  let repository: UserDao;

  beforeEach(() => {
    repository = new UserDao();
  });

  it('debería guardar un usuario', async () => {
    const user = await repository.save({
      name: 'Fernando',
      email: 'fernando@test.com',
      password: '123456',
    });

    expect(user).toEqual({
      id: 1,
      name: 'Fernando',
      email: 'fernando@test.com',
      password: '123456',
    });
  });

  it('debería buscar un usuario por email', async () => {
    await repository.save({
      name: 'Fernando',
      email: 'fernando@test.com',
      password: '123456',
    });

    const user = await repository.findOneByEmail('fernando@test.com');

    expect(user).toEqual({
      id: 1,
      name: 'Fernando',
      email: 'fernando@test.com',
      password: '123456',
    });
  });

  it('debería retornar null si no encuentra el email', async () => {
    const user = await repository.findOneByEmail('noexiste@test.com');

    expect(user).toBeNull();
  });

  it('debería listar todos los usuarios', async () => {
    await repository.save({
      name: 'Fernando',
      email: 'fernando@test.com',
      password: '123456',
    });

    await repository.save({
      name: 'Carlos',
      email: 'carlos@test.com',
      password: '123456',
    });

    const users = await repository.findAll();

    expect(users).toHaveLength(2);
  });
});