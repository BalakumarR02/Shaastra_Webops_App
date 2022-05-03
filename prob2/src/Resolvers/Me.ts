import { Resolver, Query, Ctx } from "type-graphql";

import { User } from "../entity/User";
import { MyContext } from "../types/myContext";

@Resolver()
export class MeResolver {
    @Query(() => User, { nullable: true })
    async me(@Ctx() ctx: MyContext): Promise<User | null> {
        if (!ctx.req.session!.userId) {
            return null;
        }

        return await User.findOne({ where: { id: ctx.req.session!.userId } }) as User;
    }
}