import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from './schemas/teams.schema';

@Module({
  imports : [MongooseModule.forFeature([{name : Team.name, schema : TeamSchema}])],
  providers: [TeamsService],
  controllers: [TeamsController]
})
export class TeamsModule {}
