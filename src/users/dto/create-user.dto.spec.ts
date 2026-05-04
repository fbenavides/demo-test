import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

describe('CreateUserDto', () => {
  it('debería pasar si los datos son válidos', async () => {
    const dto = plainToInstance(CreateUserDto, {
      name: 'Fernando',
      email: 'fernando@edex.pe',
      password: '123456',
    });

    const errors = await validate(dto);

    expect(errors.length).toBe(0);
  });

  it('debería fallar si el email no es válido', async () => {
    const dto = plainToInstance(CreateUserDto, {
      name: 'Fernando',
      email: 'correo-malo',
      password: '123456',
    });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('debería fallar si el password tiene menos de 6 caracteres', async () => {
    const dto = plainToInstance(CreateUserDto, {
      name: 'Fernando',
      email: 'fernando@test.com',
      password: '123',
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});