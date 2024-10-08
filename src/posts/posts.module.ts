import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/auth/entities/user.entity";
import { Post } from "./entities/post.entity";
import { CommentEntity } from "./entities/comment.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([
            User,
            Post,
            CommentEntity
          ]),
    ],
    controllers:[PostsController],
    providers:[PostsService]

})
export class PostsModule{}