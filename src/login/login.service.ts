import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './login.dto';
import { Signup, SignupDocument } from '../signup/signup.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Signup.name) private readonly signupModel: Model<SignupDocument>
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.signupModel.findOne({ email });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // Assuming you generate a JWT token here
    const token = this.generateToken(user);
    return { token };
  }

  generateToken(user: SignupDocument) {
    // Implement JWT token generation logic here
    return 'token';
  }
}
