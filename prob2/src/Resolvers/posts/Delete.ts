import { Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";

import { Post } from "../../entity/Post";
import { isAuth } from "../middleware/isAuth";

@Resolver()
export class DeleteResolver {



    @UseMiddleware(isAuth)
    @Mutation(() => Post)
    async delete(
        @Arg("id") id: number,
    ): Promise<Post | null> {

        const post = await Post.findOne({ where: { id: id } });

        if (!post)
            return null;
        await post.remove();
        return post;
    }
}