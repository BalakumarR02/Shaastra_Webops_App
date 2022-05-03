import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

import { Post } from "../../entity/Post";
import { UpdatePost } from "../input/UpdatePost";
import { isAuth } from "../middleware/isAuth";

@Resolver()
export class EditResolver {


    @UseMiddleware(isAuth)
    @Mutation(() => Post)
    async edit(
        @Arg("id") id: number,
        @Arg("data") data: UpdatePost,
    ): Promise<Post | null> {

        const post = await Post.findOne({ where: { id: id } });

        if (!post)
            return null;

        Object.assign(post, data);
        await post.save();
        return post;
    }
}