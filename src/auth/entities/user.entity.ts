import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({
        type:'text',
        unique:true
    })
    username:string;

    @Column('text')
    email:string;

    @Column('text')
    name:string;

    @Column('text')
    password:string;

    @Column({default:true})
    isActive:boolean;

    @Column('text', {default:''})
    profileImage:string;

    @Column({
        type:'enum',
        array:true,
        enum:['admin', 'user'],
        default:['user']
    })
    roles:string[]

}
