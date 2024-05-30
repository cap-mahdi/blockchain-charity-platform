import { recoverPersonalSignature } from '@metamask/eth-sig-util';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserSignatureService } from './userSignature.service';

@Injectable()
export class SignatureMatch implements CanActivate {
  constructor(private userSignatureService: UserSignatureService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { address } = request.query;
    const { signature } = request.body;
    const nonce = await this.userSignatureService.getNonce(address);
    await this.userSignatureService.remove(address);
    if (!address || !signature) return false;
    const recoveredAddress = recoverPersonalSignature({
      data: nonce,
      signature,
    });
    return address === recoveredAddress;
  }
}
