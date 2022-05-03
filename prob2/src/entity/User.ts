import { Field, ID, ObjectType } from "type-graphql";
import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    OneToMany,
} from "typeorm";

import { Post } from "./Post"

@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    username: string;

    @Field()
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Field(() => [Post])
    @OneToMany(() => Post, (post) => post.by, { nullable: true })
    posts: Post[]


}