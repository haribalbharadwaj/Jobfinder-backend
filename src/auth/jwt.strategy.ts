import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const secretOrKey = configService.get<string>('PRIVATE_KEY');
    console.log(`JWT Secret: ${secretOrKey}`); // Debug log to verify the secret value

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey, // Use the secret from configService
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
