import { UserDao, User } from './user.dao';

type CreateUserInput = Omit<User, 'id'>;

export class UserService {
  constructor(private readonly userDao: UserDao) {}

  async create(data: CreateUserInput): Promise<User> {
    const existingUser = await this.userDao.findOneByEmail(data.email);

    console.log('hola');
    
    if (existingUser) {
      throw new Error('Email already exists');
    }

    return this.userDao.save(data);
  }

  async findAll(): Promise<User[]> {
    return this.userDao.findAll();
  }
}