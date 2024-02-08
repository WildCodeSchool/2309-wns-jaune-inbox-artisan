import User, { CreateUserInput } from '../../src/entities/user.entity';

export type ResponseData = {
  users: Partial<User>[];
};

export type ResponseDataCreate = {
  insertUser: CreateUserInput;
};

export type ResponseDataDelete = {
  deleteUser: {id : number};
};

export type ResponseDataUpdate = {
  updateUser: Partial<User>;
};