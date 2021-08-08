import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./api/tables/users/users.module";

import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './api/tables/auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
    process.env.MONGODB_CONNECTION_STRING,
    { useNewUrlParser: true }),
    UsersModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {
}