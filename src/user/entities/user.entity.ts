interface IUser {
  id?: number;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deleteAt?: Date;
}

export default class User {
  readonly id: number;
  readonly email: string;
  readonly password: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deleteAt: Date;

  constructor({ id, email, password, createdAt, updatedAt, deleteAt }: IUser) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deleteAt = deleteAt;
  }
}
