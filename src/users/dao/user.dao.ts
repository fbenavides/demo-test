export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export class UserDao {
  private users: User[] = [];
  private nextId = 1;

  async findOneByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    return user ?? null;
  }

  async save(data: Omit<User, 'id'>): Promise<User> {
    const user: User = {
      id: this.nextId++,
      ...data,
    };

    this.users.push(user);

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }
}