import { IsString, IsEmail, MinLength,IsMobilePhone } from 'class-validator';

export class SignupDto {
     @IsString()
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsMobilePhone()
    mobile: Number;
}