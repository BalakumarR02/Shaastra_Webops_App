import { InputType, Field } from "type-graphql";

@InputType()
export class UpdatePost {
    @Field({ nullable: true })
    title?: string;


}