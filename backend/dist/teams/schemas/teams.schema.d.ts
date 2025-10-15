import { Document } from 'mongoose';
export type TeamDocument = Team & Document;
export declare class Team {
    name: string;
    members: string[];
    createdBy: string;
}
export declare const TeamSchema: import("mongoose").Schema<Team, import("mongoose").Model<Team, any, any, any, Document<unknown, any, Team, any, {}> & Team & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Team, Document<unknown, {}, import("mongoose").FlatRecord<Team>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Team> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
