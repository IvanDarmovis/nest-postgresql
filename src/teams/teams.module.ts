import { Module } from '@nestjs/common'
import { DbModule } from 'src/db/db.module'
import { TeamsController } from './teams.controller'
import { TeamsService } from './teams.service'

@Module({
  imports: [DbModule],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
