"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamsService = void 0;
const common_1 = require("@nestjs/common");
const teams_schema_1 = require("./schemas/teams.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let TeamsService = class TeamsService {
    teamModel;
    constructor(teamModel) {
        this.teamModel = teamModel;
    }
    ;
    async createTeam(name, user) {
        const existing = await this.teamModel.findOne({ name: name });
        if (existing) {
            throw new common_1.BadRequestException('Theres already team with that name.');
        }
        ;
        const newTeam = new this.teamModel({
            name,
            createdBy: user,
            members: []
        });
        return newTeam.save();
    }
    ;
    async disbandTeam(team, user) {
        const foundTeam = await this.teamModel.findOne({ name: team });
        if (!foundTeam) {
            throw new common_1.NotFoundException('Team not found.');
        }
        ;
        if (foundTeam?.createdBy === user.username) {
            return this.teamModel.findByIdAndDelete(foundTeam.id);
        }
        else {
            throw new common_1.UnauthorizedException('You are not allowed to disband team.');
        }
        ;
    }
    ;
    async addMember(teamsAddMemberDto, user) {
        const username = user.username;
        const foundTeam = await this.teamModel.findOne({ name: teamsAddMemberDto.team });
        if (!foundTeam)
            throw new common_1.NotFoundException('Team not found.');
        if (foundTeam.createdBy !== username) {
            throw new common_1.ForbiddenException('You are not allowed to add members.');
        }
        if (!foundTeam.members.includes(teamsAddMemberDto.username)) {
            foundTeam.members.push(teamsAddMemberDto.username);
            await foundTeam.save();
        }
        return foundTeam;
    }
    ;
    async removeMember(teamsRemoveMemberDto, user) {
        const foundTeam = await this.teamModel.findOne({ name: teamsRemoveMemberDto.team });
        if (!foundTeam)
            throw new common_1.NotFoundException('Team not found.');
        if (foundTeam.createdBy !== user.username) {
            throw new common_1.ForbiddenException('You are not allowed to remove members.');
        }
        ;
        if (!foundTeam.members.includes(teamsRemoveMemberDto.usernameToRemove)) {
            throw new common_1.NotFoundException('Member not found.');
        }
        ;
        foundTeam.members = foundTeam.members.filter(member => member != teamsRemoveMemberDto.usernameToRemove);
        await foundTeam.save();
        return foundTeam;
    }
    ;
    async getMembers(team) {
        return await this.teamModel.find({ name: team }, { members: 1, _id: 0 }).lean();
    }
    ;
    async getMyTeams(user) {
        const username = user.username;
        return await this.teamModel.find({
            $or: [
                { members: username },
                { createdBy: username }
            ]
        });
    }
    ;
};
exports.TeamsService = TeamsService;
exports.TeamsService = TeamsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(teams_schema_1.Team.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], TeamsService);
;
//# sourceMappingURL=teams.service.js.map