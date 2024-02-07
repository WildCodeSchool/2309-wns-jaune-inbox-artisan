import User from '../../src/entities/user.entity';

export type ResponseData = {
  users: Partial<User>[];
};