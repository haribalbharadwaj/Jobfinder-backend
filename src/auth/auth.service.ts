import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../login/login.dto';
import { SignupService } from '../signup/signup.service';
import { Signup, SignupDocument } from '../signup/signup.model';
import { ForgotPasswordDto } from 'src/forgot/forgot-password.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Signup.name) private readonly signupModel: Model<SignupDocument>,
    private readonly jwtService: JwtService,
    private readonly signupService: SignupService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.signupService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async forgotPassword(forgotPasswordDto:ForgotPasswordDto): Promise<any>{
    const {email} = forgotPasswordDto;
    return {message:'Password reset link sent to your email.'}
  }
}
