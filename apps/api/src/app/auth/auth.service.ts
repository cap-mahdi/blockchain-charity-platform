import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserSignatureService } from '../userSignature/userSignature.service';

export const ADMIN_ADDRESSES = ['0xe1578fc20E333933Fa60EFB7F300ED022fa920c4'];
@Injectable()
export class AuthService {
  constructor(private userSignatureService: UserSignatureService) {}

  async getNewNonce(address: string) {
    return this.userSignatureService.create(address).then((us) => us.nonce);
  }

  async isAdmin(address: string) {
    if (
      !ADMIN_ADDRESSES.map((a) => a.toLowerCase()).includes(
        address.toLowerCase()
      )
    ) {
      throw new ForbiddenException('You are not an admin');
    }
  }
}
