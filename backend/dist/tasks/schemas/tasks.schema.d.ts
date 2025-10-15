import { Document } from 'mongoose';
export type TaskDocument = Task & Document;
export declare enum TaskStatus {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}
export declare class Task {
    title: string;
    description: string;
    assignedTo: string;
    team: string;
    author: string;
    status: TaskStatus;
    completedAt: Date | null;
}
export declare const TaskSchema: import("mongoose").Schema<Task, import("mongoose").Model<Task, any, any, any, Document<unknown, any, Task, any, {}> & Task & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Task, Document<unknown, {}, import("mongoose").FlatRecord<Task>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Task> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
