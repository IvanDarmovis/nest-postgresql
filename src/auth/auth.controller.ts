import {
  Controller,
  UseGuards,
  Param,
  Post,
  Request,
  Body,
  Get,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CreateUserDto } from 'src/user/user.dto/create-user.dto/create-user.dto'
import { AuthService } from './auth.service'
import { Request as Req } from 'express'
import { ResUserDto } from 'src/user/user.dto/res-user.dto/res-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return await this.service.login(req.user)
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll() {
    return await this.service.getAll()
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.service.getOne(id)
  }

  @Post('signup')
  async register(@Body() user: CreateUserDto) {
    return await this.service.register(user)
  }
}
