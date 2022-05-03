import { Resolver, Query, Mutation, Arg } from "type-graphql";
import * as bcrypt from "bcryptjs";

import { User } from "../entity/User";
import { RegisterInput } from "./input/RegisterInput";

@Resolver()
export class RegisterResolver {
    @Query(() => String)
    async hello() {
        return "Hello World!";
    }

    @Mutation(() => User)
    async register(@Arg("data")
    {
        username,
        email,
        password
    }: RegisterInput): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        }).save();

        return user;
    }
}