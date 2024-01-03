import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class UserStrategy extends PassportStrategy(Strategy) {
  constructor(private auth:AuthService) {
    super({
      usernameId : "id",
      usernameField: 'email'
    })
  }

  async validate(email:string, password:string) {
    const user = await this.auth.checkUser(email,password)

    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}