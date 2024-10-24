import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Post } from "./entities/post.entity";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { CommentEntity } from "./entities/comment.entity";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>
  ) { }

  async findByUserId(id: string) {
    return await this.postRepository.find({
      where: {
        user: { id }
      },
      relations: {
        comments:true
      }
    });
  }
  
  async createPost(createPost: CreatePostDto) {
    try {
      const post = this.postRepository.create({
        url: createPost.url,
        user:{id:createPost.userId}
      });
      return await this.postRepository.save(post);
    } catch (error) {
      throw new InternalServerErrorException('Error creando post');
    }
  }

  async createComment(createCommentDto: CreateCommentDto) {
    try {
      const comment = this.commentRepository.create({
        comment: createCommentDto.comment,
        user:{id: createCommentDto.userId},
        post:{id: createCommentDto.postId}
      });
      return await this.commentRepository.save(comment);
    } catch (error) {
      throw new InternalServerErrorException('Error creando el comentario');
    }
  }

  deletePost(id: string) {
    return this.postRepository.delete({id});
  }

}
