import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSignature } from '../../entities/UserSignature.entity';
import { Repository } from 'typeorm';
import uniqid from 'uniqid';

@Injectable()
export class UserSignatureService {
  constructor(
    @InjectRepository(UserSignature)
    private userSignatureRepository: Repository<UserSignature>
  ) {}
  async getNonce(address: string): Promise<string | null> {
    const us = await this.userSignatureRepository.findOne({
      where: { address },
    });
    if (us) return us.nonce;
    return null;
  }

  async create(address: string) {
    const nonce = this.createNonce();
    return this.userSignatureRepository.save({ address, nonce });
  }

  async remove(address: string) {
    return this.userSignatureRepository.delete({ address });
  }

  createNonce() {
    return uniqid();
  }
}
