import { Types } from "mongoose";

export class CreatePostDto {
  userId: string;
  title: string;
  description: string;
}