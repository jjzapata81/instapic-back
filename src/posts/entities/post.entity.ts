import { User } from "src/auth/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CommentEntity } from "./comment.entity";

@Entity('posts')
export class Post{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type:'varchar'})
    url:string

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(
        () => User,
        user => user.posts
    )
    user: User;

    @OneToMany(
        () => CommentEntity,
        comment => comment.post
    )
    comments: CommentEntity[];

}