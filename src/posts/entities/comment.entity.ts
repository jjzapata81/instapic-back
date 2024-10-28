import { User } from "src/auth/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity('comments')
export class CommentEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type:'varchar'})
    comment:string

    @ManyToOne(
        () => User,
        user => user.comments
    )
    user: User;

    @ManyToOne(
        () => Post,
        post => post.comments,
        {onDelete:'CASCADE'}
    )
    post: Post;

}