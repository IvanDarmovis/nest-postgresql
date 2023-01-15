import { Injectable, Inject } from '@nestjs/common'
import { PG_CONNECTION } from 'src/constants'
import { CreateUserDto } from './user.dto/create-user.dto/create-user.dto'

@Injectable()
export class UserService {
  constructor(@Inject(PG_CONNECTION) private db: any) {}

  async findByName(username: string) {
    const user = await this.db.query(
      `SELECT * FROM users WHERE username = '${username}';`
    )

    return user.rows[0]
  }

  async findById(id: string) {
    const user = await this.db.query(`SELECT * FROM users WHERE id = '${id}';`)

    return user.rows[0]
  }

  async getAllUsers() {
    const res = await this.db.query(`SELECT * FROM users;`)
    return res.rows
  }

  async addUser(user: CreateUserDto) {
    const res = await this.findByName(user.username)

    if (!res) {
      await this.db.query(`
      INSERT INTO users (username, password)
        VALUES ('${user.username}', '${user.password}');`)
      const result = await this.findByName(user.username)
      const { password, ...restData } = result
      return restData
    }

    return {
      statusCode: 400,
      message: 'This user already exist',
    }
  }
}
