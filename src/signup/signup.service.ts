import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SignupModel } from './signup.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './signup.dto';

@Injectable()
export class SignupService {
    constructor(
        @InjectModel("Signup") private signupModel: Model<SignupModel>
    ) {}

    async signup(signupDto: SignupDto) {
        const { username, email, password, mobile } = signupDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new this.signupModel({
            username,
            email,
            password: hashedPassword,
            mobile
        });

        try {
            return await newUser.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new HttpException('Username or Email already exists', HttpStatus.CONFLICT);
            }
            throw new HttpException('Error creating user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findByEmail(email: string): Promise<SignupModel | null> {
        return this.signupModel.findOne({ email }).exec();
    }
}
