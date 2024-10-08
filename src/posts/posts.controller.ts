import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('posts')
export class PostsController {

  constructor(private readonly postsService:PostsService){}

  @Get()
  findAll(){
    return this.postsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id:string){
    return this.postsService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  createPost(@Req() req){
    const request:CreatePostDto = req.body;
    return this.postsService.createPost(request);
  }

  @Put(':id')
  updatePost(@Param('id') id:string, @Body() request:UpdatePostDto){
    this.postsService.updatePost(id, request);
  }

  @Delete(':id')
  deletePost(@Param('id') id:string){
    this.postsService.deletePost(id);
  }

}

