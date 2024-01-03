import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private userservice:UserService, private auth:AuthService){}
  
  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Req() req:Request) {
    return this.userservice.getToken(req.user)
  } 

  @UsePipes(new ValidationPipe())
  @Post("signup")
  signup(@Body() dto:UserDto) {
    return this.auth.makeUser(dto)
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("profile")
  profile(@Req() req:Request) {
    const user = req.user
    console.log(user)
    return user
  }
}
