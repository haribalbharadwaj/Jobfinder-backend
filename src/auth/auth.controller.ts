import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../login/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ForgotPasswordDto } from 'src/forgot/forgot-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('forgot-password')
    async forgotPassword(@Body() forgotPasswordDto:ForgotPasswordDto){
      return this.authService.forgotPassword(forgotPasswordDto);
    }
}
