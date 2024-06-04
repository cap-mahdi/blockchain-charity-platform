import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommentService } from './comment.service';
import { SignatureMatch } from '../userSignature/signatureMatch.guard';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get(':campaignAddress')
  getComments(@Param('campaignAddress') campaignAddress: string) {
    return this.commentService.getComments(campaignAddress);
  }
  @UseGuards(SignatureMatch)
  @Post()
  // @UseInterceptors(FileInterceptor('file'))
  addComment(
    @Body()
    {
      content,
      campaignAddress,
    }: {
      content: string;
      campaignAddress: string;
    },
    @Query('address') address: string
  ) {
    console.log('content', content);
    console.log('campaignAddress', campaignAddress);
    return this.commentService.addComment(
      content,
      [],
      address,
      campaignAddress
    );
  }
}
