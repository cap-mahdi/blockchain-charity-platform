import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../../entities/Comment.entity';
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>
  ) {}

  async addComment(
    content: string,
    file: any,
    walletAddress: string,
    campaignAddress: string
  ) {
    const comment = this.commentRepository.create({
      content,
      image: '',
      walletAddress,
      campaignAddress,
    });

    return this.commentRepository.save(comment);
  }

  async getComments(campaignAddress: string) {
    console.log('campaignAddress', campaignAddress);
    return this.commentRepository.find({
      where: {
        campaignAddress,
      },
    });
  }
}
