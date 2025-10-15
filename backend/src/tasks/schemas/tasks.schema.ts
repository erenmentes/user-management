import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

@Schema({timestamps : true})
export class Task {
    @Prop({required : true})
    title : string;

    @Prop()
    description : string;

    @Prop()
    assignedTo : string;

    @Prop()
    team : string;

    @Prop({required : true})
    author : string;

    @Prop({ 
        type: String, 
        enum: Object.values(TaskStatus), 
        default: TaskStatus.TODO,
        required: true 
    })
    status: TaskStatus;

    @Prop({ type: Date, default: null })
    completedAt: Date | null;
};

export const TaskSchema = SchemaFactory.createForClass(Task);