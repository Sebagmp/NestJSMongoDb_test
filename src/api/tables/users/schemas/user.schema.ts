import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty, MinLength, IsDate, Matches } from 'class-validator';
import { Post } from "../../posts/schemas/post.schema";
import { Types } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ unique: true })
  @IsNotEmpty()
  userId: string;

  @Prop({ require: true, unique: true })
  @IsEmail()
  email: string;

  @Prop({ require: true })
  @IsNotEmpty()
  firstName: string;

  @Prop({ require: true })
  @IsNotEmpty()
  lastName: string;

  @Prop({ require: true, unique: true })
  @IsNotEmpty()
  username: string;

  @Prop({ require: true })
  @MinLength(4)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  password: string;

  @Prop({ require: true })
  @IsNotEmpty()
  isLog: boolean;

  _id: string;

  @Prop({ require: true })
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @Prop({ require: true })
  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;

  @Prop({ require: true })
  @IsNotEmpty()
  roles: [];

  @Prop({ require: true })
  @IsNotEmpty()
  salt: string;

  @Prop({type: [Types.ObjectId], ref: "Post"})
  posts: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);
