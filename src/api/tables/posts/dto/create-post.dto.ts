import { Types } from "mongoose";

export class CreatePostDto {
  userId: Types.ObjectId | string;
  title: string;
  description: string;
}