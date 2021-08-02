import {Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({require: true})
    first_name: string;

    @Prop({require: true})
    last_name: string;

    @Prop({require: true})
    username: string;

    @Prop({require: true})
    email: string;

    @Prop({require: true})
    password: string;

    @Prop()
    userID: string;

    @Prop()
    isLog: boolean;

    @Prop()
    hash: string;

    @Prop()
    salt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);