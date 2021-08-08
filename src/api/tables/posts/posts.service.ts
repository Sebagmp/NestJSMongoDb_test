import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Post, PostDocument } from "./schemas/post.schema";
import { CreatePostDto } from "./dto/create-post.dto";
import { UsersService } from "../users/users.service";
import { UpdatePostDto } from "./dto/update-post.dto";
import { User } from "../users/schemas/user.schema";


@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>,
              private usersService: UsersService) {
  }

  async create(newPostInfo: CreatePostDto): Promise<Post>{
    const { title, userId } = newPostInfo;
    const userExist = await this.postModel.findOne({ title });
    if (userExist) {
      throw new ConflictException("Post already exist with this title");
    }
    const newPost = new this.postModel(newPostInfo);
    newPost.createdAt = new Date();
    newPost.updatedAt = new Date();
    try {
      await newPost.save();
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("Post already exist");
      } else {
        throw new InternalServerErrorException();
      }
    }

    await this.usersService.updatePostsArray(userId, newPost);
    return newPost;
  }

  async findAll() {
    const info = await this.postModel.find().populate(User.name);
    return info;
  }

  async findOne(id: string) {
    return this.postModel.findOne({ id });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    updatePostDto.updatedAt = new Date();
    return this.postModel.findOneAndUpdate(updatePostDto, { id });
  }

  async remove(id: string) {
    return this.postModel.findByIdAndDelete(id)
  }
}
