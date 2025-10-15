import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Team, TeamDocument } from './schemas/teams.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TeamsActionDto } from './dto/teams-action.dto';
import { TeamsAddMemberDto } from './dto/teams-add-member.dto';
import { TeamsRemoveMemberDto } from './dto/teams-remove-member.dto';

@Injectable()
export class TeamsService {
    constructor(
        @InjectModel(Team.name) private teamModel: Model<TeamDocument>
    ) { };

    async createTeam(name: string, user: string) {
        const existing = await this.teamModel.findOne({ name: name });
        if (existing) {
            throw new BadRequestException('Theres already team with that name.');
        };

        const newTeam = new this.teamModel({
            name,
            createdBy: user,
            members: []
        });

        return newTeam.save();
    };

    async disbandTeam(team: string, user: string) {
        const foundTeam = await this.teamModel.findOne({ name: team });

        if (!foundTeam) {
            throw new NotFoundException('Team not found.');
        };

        if (foundTeam?.createdBy === user) {
            return this.teamModel.findByIdAndDelete(foundTeam.id);
        } else {
            throw new UnauthorizedException('You are not allowed to disband team.');
        };
    };

    async addMember(teamsAddMemberDto : TeamsAddMemberDto, user: string) {
        const foundTeam = await this.teamModel.findOne({ name: teamsAddMemberDto.team });
        if (!foundTeam) throw new NotFoundException('Team not found.');

        if (foundTeam.createdBy !== user) {
            throw new ForbiddenException('You are not allowed to add members.');
        }

        if (!foundTeam.members.includes(teamsAddMemberDto.username)) {
            foundTeam.members.push(teamsAddMemberDto.username);
            await foundTeam.save();
        }

        return foundTeam;
    };

    async removeMember(teamsRemoveMemberDto : TeamsRemoveMemberDto, user: string) {
        const foundTeam = await this.teamModel.findOne({ name: teamsRemoveMemberDto.team });
        if (!foundTeam) throw new NotFoundException('Team not found.');

        if (foundTeam.createdBy !== user) {
            throw new ForbiddenException('You are not allowed to remove members.');
        };

        if (!foundTeam.members.includes(teamsRemoveMemberDto.usernameToRemove)) {
            throw new NotFoundException('Member not found.');
        };

        foundTeam.members = foundTeam.members.filter(member => member != teamsRemoveMemberDto.usernameToRemove);
        await foundTeam.save();

        return foundTeam;
    };

    async getMembers(team: string) {
        return await this.teamModel.findOne({ name: team }, { members: 1, _id: 0, createdBy: 0 }).lean();
    };

}
