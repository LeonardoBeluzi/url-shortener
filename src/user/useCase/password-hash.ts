import * as bcrypt from 'bcrypt';

export default class PasswordHash {
  private SALT = 10;

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.SALT);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
