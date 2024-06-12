import {Schema,Prop,SchemaFactory} from '@nestjs/mongoose'
import {Document} from "mongoose"

export type SignupDocument = Signup & Document;

@Schema()
export class Signup{
    @Prop({required: true})
    username: String;

    @Prop({required: true})
    email: String;

    @Prop({requires: true,unique:true})
    mobile: Number;

    @Prop({ required: true })
    password: String;
}
export type SignupModel = Signup & Document

export const SignupSchema = SchemaFactory.createForClass(Signup)