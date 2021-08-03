import {Body, Controller, Post} from '@nestjs/common';
import { PostsService } from './posts.service'

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    createPost(
        @Body('title') postTitle: string,
        @Body('text') postText: string,
    ) {
        const postGeneratedId = this.postsService.insertPost(postTitle, postText);

        return { id: postGeneratedId};
    }
}