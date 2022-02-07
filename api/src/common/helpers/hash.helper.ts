import * as bcrypt from 'bcryptjs';
export class HashHelper {
  public static hashValue(value: string) {
    return bcrypt.hashSync(value, 8);
  }

  public static checkHashValue(hashValue: string, value: string) {
    return bcrypt.compareSync(value, hashValue);
  }
}