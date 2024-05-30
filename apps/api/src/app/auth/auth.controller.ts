import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { SignatureMatch } from '../userSignature/signatureMatch.guard';
import { AuthService } from './auth.service';

@Controller('auth/metamask')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('nonce')
  async getNonce(@Query('address') address: string) {
    const nonce = await this.authService.getNewNonce(address);
    return { nonce };
  }

  @Post('login')
  @UseGuards(SignatureMatch)
  login() {
    return 'Logged in!';
  }
}
