import { User } from "src/auth/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity('comments')
export class CommentEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type:'varchar'})
    comment:string

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(
        () => User,
        user => user.posts
    )
    user: User;

    @ManyToOne(
        () => Post,
        post => post.comments
    )
    post: Post;

}