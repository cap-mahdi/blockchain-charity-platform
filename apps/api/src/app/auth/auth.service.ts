import { Injectable } from '@nestjs/common';
import { UserSignatureService } from '../userSignature/userSignature.service';

@Injectable()
export class AuthService {
  constructor(private userSignatureService: UserSignatureService) {}

  async getNewNonce(address: string) {
    return this.userSignatureService.create(address).then((us) => us.nonce);
  }
}
