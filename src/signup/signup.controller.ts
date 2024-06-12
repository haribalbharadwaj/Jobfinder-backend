import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './signup.dto';
import { SignupService } from './signup.service';

@Controller('signup')
export class SignupController {
  
  constructor(private readonly signupService: SignupService) {}

  @Post()
  async signup(@Body() signupDto: SignupDto) {
    try {
      const result = await this.signupService.signup(signupDto);
      return {
        message: 'User created successfully',
        data: result,
      };
    } catch (error) {
      // Handle errors here
      return {
        statusCode: error.status || 500,
        message: error.message || 'An error occurred while creating the user',
      };
    }
  }
}
