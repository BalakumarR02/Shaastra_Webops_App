import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import * as cors from "cors";
import {
    ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";


import { RegisterResolver } from "./Resolvers/Register";
import { redis } from "./redis";
import { LoginResolver } from "./Resolvers/Login";
import { MeResolver } from "./Resolvers/Me";
import { CreateResolver } from "./Resolvers/posts/Create";
import { EditResolver } from "./Resolvers/posts/Edit";
import { DeleteResolver } from "./Resolvers/posts/Delete";

const main = async () => {
    await createConnection();

    const schema = await buildSchema({
        resolvers: [MeResolver, RegisterResolver, LoginResolver, CreateResolver, EditResolver, DeleteResolver],
    });

    const apolloServer = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
        context: ({ req }: any) => ({ req })
    });

    const app = Express();

    const RedisStore = connectRedis(session);

    app.use(
        cors({
            credentials: true,
            origin: "http://localhost:4000"
        })
    );

    app.use(
        session({
            store: new RedisStore({
                client: redis as any
            }),
            name: "qid",
            secret: "aslkdfjoiq12312",
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
            }
        })
    );
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log("server started on http://localhost:4000/graphql");
    });
};

main();