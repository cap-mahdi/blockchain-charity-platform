import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { Comment } from '../../entities/Comment.entity';
import { CommentController } from './comment.controller';
import { AuthModule } from '../auth/auth.module';
import { UserSignatureModule } from '../userSignature/userSignature.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UserSignatureModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommnetModule {}
