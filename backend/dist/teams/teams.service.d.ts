import { Team, TeamDocument } from './schemas/teams.schema';
import { Model } from 'mongoose';
import { TeamsAddMemberDto } from './dto/teams-add-member.dto';
import { TeamsRemoveMemberDto } from './dto/teams-remove-member.dto';
export declare class TeamsService {
    private teamModel;
    constructor(teamModel: Model<TeamDocument>);
    createTeam(name: string, user: string): Promise<import("mongoose").Document<unknown, {}, TeamDocument, {}, {}> & Team & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    disbandTeam(team: string, user: string): Promise<(import("mongoose").Document<unknown, {}, TeamDocument, {}, {}> & Team & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    addMember(teamsAddMemberDto: TeamsAddMemberDto, user: string): Promise<import("mongoose").Document<unknown, {}, TeamDocument, {}, {}> & Team & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    removeMember(teamsRemoveMemberDto: TeamsRemoveMemberDto, user: string): Promise<import("mongoose").Document<unknown, {}, TeamDocument, {}, {}> & Team & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getMembers(team: string): Promise<(import("mongoose").FlattenMaps<TeamDocument> & Required<{
        _id: import("mongoose").FlattenMaps<unknown>;
    }> & {
        __v: number;
    }) | null>;
}
