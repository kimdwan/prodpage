import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private jwt:JwtService, private config:ConfigService) {}

  async getToken (payload:object) {
    const access_token = await this.jwt.signAsync(payload, {secret : this.config.get("JWT_SECRET")})
    return {access_token}
  }
}
