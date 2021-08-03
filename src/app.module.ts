import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {PostsModule} from "./Tables/Posts/posts.module";
import {UsersModule} from "./Tables/Users/users.module";


@Module({
    imports: [MongooseModule.forRoot(
        'mongodb+srv://db-nestjs-mongodb-demo:db-nestjs-mongodb-demo@cluster0.l2pcd.mongodb.net/nestjs-mongodb-demo', {useNewUrlParser: true}),
        PostsModule, UsersModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
