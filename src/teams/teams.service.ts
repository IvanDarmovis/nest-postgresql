import { Injectable, Inject } from '@nestjs/common'
import { mockData, PG_CONNECTION } from '../constants'
import { TeamsDto } from './teams.dto/teams.dto'

@Injectable()
export class TeamsService {
  constructor(@Inject(PG_CONNECTION) private db: any) {}

  async getAll() {
    const res = await this.db.query('SELECT * FROM teams;')
    return res.rows
  }

  async getOne(id: string) {
    const res = await this.db.query(`SELECT * FROM teams WHERE id = ${id};`)
    return res.rows[0]
  }

  async findByName(title: string) {
    const res = await this.db.query(
      `SELECT * FROM teams WHERE title = '${title}';`
    )
    return res.rows[0]
  }

  async createTeam(team: TeamsDto) {
    const double = await this.findByName(team.name)
    if (double)
      return {
        statusCode: 400,
        message: 'This team title used already',
      }
    await this.db.query(
      `INSERT INTO teams (title)
          VALUES ('${team.name}');`
    )
    return await this.findByName(team.name)
  }

  async updateTeam(id: string, team: TeamsDto) {
    await this.db.query(
      `UPDATE teams
          SET title = '${team.name}'
          WHERE id = ${id};`
    )
    return await this.getOne(id)
  }

  async removeTeam(id: string) {
    const res = await this.db.query(`DELETE FROM teams WHERE id = ${id};`)
    return res.rowCount
  }
}
