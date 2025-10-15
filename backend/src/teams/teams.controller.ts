import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/auth/user.decorator';
import { TeamsService } from './teams.service';
import type { TeamsAddMemberDto } from './dto/teams-add-member.dto';
import type { TeamsRemoveMemberDto } from './dto/teams-remove-member.dto';

@Controller('teams')
export class TeamsController {

    constructor(private teamsService : TeamsService) {};

    @UseGuards(AuthGuard)
    @Post('/create')
    async createTeam(@Body('name') name : string, @User() user : any) {
        return await this.teamsService.createTeam(name,user.username);
    };

    @UseGuards(AuthGuard)
    @Delete('delete/:team')
    async disbandTeam(@Param('team') team : string,@User() user : any) {
        return await this.teamsService.disbandTeam(team,user.username);
    };

    @UseGuards(AuthGuard)
    @Post('add')
    async addMember(@Body() teamsAddMemberDto : TeamsAddMemberDto,@User() user : any) {
        return await this.teamsService.addMember(teamsAddMemberDto,user);
    };

    @UseGuards(AuthGuard)
    @Delete('remove')
    async removeMember(@Body() teamsRemoveMemberDto : TeamsRemoveMemberDto,@User() user : any) {
        return await this.teamsService.removeMember(teamsRemoveMemberDto,user);
    };

    @UseGuards(AuthGuard)
    @Get(':team/members')
    async getMembers(@Param('team') team : string) {
        return await this.teamsService.getMembers(team);
    };
    
}
