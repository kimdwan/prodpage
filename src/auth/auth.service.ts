import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2'
import {v4 as uuid} from "uuid"

@Injectable()
export class AuthService {
  constructor(private prisma:PrismaService) {}

  async checkUser(email:string, passport:string) {
    const user = await this.prisma.user.findUnique({
      where:{
        email : email
      }
    })

    if (!user) {
      throw new Error("이메일이 존재하지 않습니다.")
    }

    const checkPassword = await argon.verify(user.hash, passport)
    if (!checkPassword) {
      throw new Error("비밀번호가 다릅니다.")
    }

    return {"id":user.id,"email":user.email}
  }

  async makeUser(dto:UserDto) {
    const checkUser = await this.prisma.user.findUnique({
      where : {
        email : dto.email
      }
    })

    if (checkUser) {
      throw new Error("이메일이 이미 존재합니다.")
    }

    const hash = await argon.hash(dto.password)
    const newUser = await this.prisma.user.create({
      data : {
        id : uuid(),
        email : dto.email,
        hash : hash,
        username : dto.username
      }
    })

    delete newUser.hash
    return newUser

  }
}
