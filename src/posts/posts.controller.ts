import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('posts')
export class PostsController {

  constructor(private readonly postsService:PostsService){}

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Body() request){
    const id = request['userdId'];
    return this.postsService.findByUserId(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  createPost(@Body() request:CreatePostDto){
    return this.postsService.createPost(request);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deletePost(@Param('id') id:string){
    return this.postsService.deletePost(id);
  }

  @UseGuards(AuthGuard)
  @Post('comment')
  createComment(@Body() createCommentDto:CreateCommentDto){
    return this.postsService.createComment(createCommentDto);
  }

}

