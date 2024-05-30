import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSignatureModule } from '../userSignature/userSignature.module';

@Module({
  imports: [UserSignatureModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
