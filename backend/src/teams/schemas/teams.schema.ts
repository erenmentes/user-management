import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeamDocument = Team & Document;

@Schema({timestamps : true})
export class Team {
    @Prop({required : true})
    name : string;

    @Prop({type : [String], default : []})
    members : string[];

    @Prop({required : true})
    createdBy : string;
};

export const TeamSchema = SchemaFactory.createForClass(Team);