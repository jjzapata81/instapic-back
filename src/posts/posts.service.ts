import { Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostsService{

    posts = [];

    findAll(){
      return this.posts;
    }
  
    findById(id:string){
      return this.posts.find(post=>post.id===id);
    }
  

    createPost(createPost:CreatePostDto){
      this.posts = [...this.posts, createPost];
      return this.posts;
    }
  
    updatePost(id:string, updatePost:UpdatePostDto){
      this.posts = this.posts.map(post => 
        post.id === id 
          ? {...post, ...updatePost}
          : post
      );
    }
  
    deletePost(id:string){
      this.posts = this.posts
        .filter(post=>post.id!==id);
    }

}
