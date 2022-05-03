import { Resolver, Mutation, Arg, UseMiddleware, Ctx } from "type-graphql";

import { Post } from "../../entity/Post";
import { isAuth } from "../middleware/isAuth";
import { User } from "../../entity/User";
import { MyContext } from "../../types/myContext";

@Resolver()
export class CreateResolver {




    @UseMiddleware(isAuth)
    @Mutation(() => Post)
    async create(
        @Arg("title") title: string,
        @Ctx() ctx: MyContext
    ): Promise<Post> {

        const by1 = await User.findOne({ where: { id: ctx.req.session!.userId } });

        const post = await Post.create({
            title: title,
            by: by1

        }).save();

        return post;
    }
}