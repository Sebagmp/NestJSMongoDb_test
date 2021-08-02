import { Injectable } from '@nestjs/common';
import { Post } from "./post.model";

@Injectable()
export class PostsService {
    posts: Post[] = [];

    insertPost(title: string, text: string){
        const newPost = new Post(title, text, new Date().toDateString())
        return this.posts.push(newPost);
    }
}