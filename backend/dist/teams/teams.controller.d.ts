import { TeamsService } from './teams.service';
import type { TeamsAddMemberDto } from './dto/teams-add-member.dto';
import type { TeamsRemoveMemberDto } from './dto/teams-remove-member.dto';
export declare class TeamsController {
    private teamsService;
    constructor(teamsService: TeamsService);
    createTeam(name: string, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/teams.schema").TeamDocument, {}, {}> & import("./schemas/teams.schema").Team & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    disbandTeam(team: string, user: any): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/teams.schema").TeamDocument, {}, {}> & import("./schemas/teams.schema").Team & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    addMember(teamsAddMemberDto: TeamsAddMemberDto, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/teams.schema").TeamDocument, {}, {}> & import("./schemas/teams.schema").Team & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    removeMember(teamsRemoveMemberDto: TeamsRemoveMemberDto, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/teams.schema").TeamDocument, {}, {}> & import("./schemas/teams.schema").Team & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getMembers(team: string): Promise<(import("mongoose").FlattenMaps<import("./schemas/teams.schema").TeamDocument> & Required<{
        _id: import("mongoose").FlattenMaps<unknown>;
    }> & {
        __v: number;
    })[]>;
    getMyTeams(user: any): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/teams.schema").TeamDocument, {}, {}> & import("./schemas/teams.schema").Team & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
}
