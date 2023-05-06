import { hash } from 'bcrypt';

export class EncryptService {
  private _salt: string;

  constructor() {
    this._salt = process.env.SALT_ENCRYPT_PASSWORD || '';
  }
  async encrypt(plainPassword: string): Promise<string> {
    return hash(plainPassword, this._salt);
  }
}
