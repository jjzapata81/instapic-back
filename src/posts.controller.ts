import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('posts')
export class PostsController {

  posts = [];

  @Get()
  findAll(){
    return this.posts;
  }

  @Get(':id')
  findById(@Param('id') id:string){
    return this.posts.find(post=>post.id===id);
  }

  @Post()
  createPost(@Body() request){
    this.posts = [...this.posts, request];
  }

  @Put(':id')
  updatePost(@Param('id') id:string, @Body() request){
    this.posts = this.posts.map(post => 
      post.id === id 
        ? {...post, ...request}
        : post
    );
  }

  @Delete(':id')
  deletePost(@Param('id') id:string){
    this.posts = this.posts.filter(post=>post.id!==id);
  }

}

