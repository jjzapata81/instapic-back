import { CommentEntity } from "src/posts/entities/comment.entity";
import { Post } from "src/posts/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({
        type:'varchar',
        unique:true
    })
    username:string;

    @Column({type:'varchar'})
    email:string;

    @Column({type:'varchar'})
    name:string;

    @Column({type:'varchar'})
    password:string;

    @Column({
        default:true,
        name:'is_active'
    })
    isActive:boolean;

    @Column({
        type:'varchar',
        default:'', 
        name:'profile_image'})
    profileImage:string;

    @Column({
        type:'enum',
        array:true,
        enum:['admin', 'user'],
        default:['user']
    })
    roles:string[];

    @OneToMany(
        () => Post,
        post => post.user,
        { cascade:true }
    )
    posts?: Post[];

    @OneToMany(
        ()=>CommentEntity,
        comment=>comment.user
    )
    comments:CommentEntity[];

}
