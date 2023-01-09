import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common'
import { TeamsDto } from './teams.dto/teams.dto'
import { TeamsService } from './teams.service'

@Controller('teams')
export class TeamsController {
  constructor(private readonly service: TeamsService) {}

  @Get()
  getAll() {
    return this.service.getAll()
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.getOne(id)
  }

  @Post()
  createTeam(@Body() team: TeamsDto) {
    return this.service.createTeam(team)
  }

  @Put(':id')
  updateTeam(@Param('id') id: string, @Body() team: TeamsDto) {
    return this.service.updateTeam(id, team)
  }

  @Delete(':id')
  removeTeam(@Param('id') id: string) {
    return this.service.removeTeam(id)
  }
}
