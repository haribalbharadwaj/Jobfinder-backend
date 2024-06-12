import { Module } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupController } from './signup.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {Signup, SignupSchema } from './signup.model';

@Module({
  imports:[
    MongooseModule.forFeature(
     [ {
        name:Signup.name,
        schema:SignupSchema
      }]
    )
  ],
  providers: [SignupService],
  controllers: [SignupController]
})
export class SignupModule {}
