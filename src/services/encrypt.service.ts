import { hash } from 'bcrypt';

export class Encrypt {
    encrypt(plainPassword: string): Promise<string> {
        return hash(plainPassword, 10);
    }
}
