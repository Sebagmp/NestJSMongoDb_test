import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { IsDate, IsNotEmpty } from "class-validator";
import { User } from "../../users/schemas/user.schema";

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ type: Types.ObjectId, ref: "User"})
  userId: Types.ObjectId;

  @Prop({ require: true, unique: true })
  title: string;

  @Prop({ require: true })
  description: string;

  @Prop({ require: true })
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @Prop({ require: true })
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
