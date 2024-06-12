import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { SignupModule } from './signup/signup.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule available globally
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI), // Use environment variable directly
    AuthModule,
    SignupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
