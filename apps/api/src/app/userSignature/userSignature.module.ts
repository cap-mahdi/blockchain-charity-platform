import { Module } from '@nestjs/common';
import { UserSignature } from '../../entities/UserSignature.entity';
import { SignatureMatch } from './signatureMatch.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSignatureService } from './userSignature.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserSignature])],
  providers: [UserSignatureService, SignatureMatch],
  exports: [UserSignatureService, SignatureMatch],
})
export class UserSignatureModule {}
