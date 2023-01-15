import { Injectable } from '@nestjs/common'
import { CreateUserDto } from 'src/user/user.dto/create-user.dto/create-user.dto'
import { UserService } from 'src/user/user.service'
import { hashSync, genSaltSync, compareSync } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { ResUserDto } from 'src/user/user.dto/res-user.dto/res-user.dto'

@Injectable()
export class AuthService {
  constructor(private service: UserService, private jwt: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.service.findByName(username)
    const compare = compareSync(password, user.password)

    if (user && compare) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async getAll() {
    const res = await this.service.getAllUsers()
    return res
  }

  async getOne(id: string) {
    const user = await this.service.findById(id)
    return user
  }

  async register(user: CreateUserDto) {
    const pass = hashSync(user.password, genSaltSync(10))

    const res = await this.service.addUser({ ...user, password: pass })

    return res
  }

  async login(user) {
    const payload = { id: user.id }
    const token = this.jwt.sign(payload)
    return {
      accessToken: token,
    }
  }
}
