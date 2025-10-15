import { TaskActionDto } from './dto/task-action.dto';
import { Task, TaskDocument } from './schemas/tasks.schema';
import { Model } from 'mongoose';
export declare class TasksService {
    private taskModel;
    constructor(taskModel: Model<TaskDocument>);
    createTask(taskActionDto: TaskActionDto, username: string): Promise<import("mongoose").Document<unknown, {}, TaskDocument, {}, {}> & Task & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateTask(taskActionDto: TaskActionDto, id: string, username: string): Promise<import("mongoose").Document<unknown, {}, TaskDocument, {}, {}> & Task & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAllTasks(): Promise<(import("mongoose").Document<unknown, {}, TaskDocument, {}, {}> & Task & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getTaskById(id: string): Promise<(import("mongoose").Document<unknown, {}, TaskDocument, {}, {}> & Task & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    getTeamTasks(team: string): Promise<(import("mongoose").Document<unknown, {}, TaskDocument, {}, {}> & Task & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    getTasksByUser(username: string): Promise<(import("mongoose").Document<unknown, {}, TaskDocument, {}, {}> & Task & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    deleteTask(id: string, username: string): Promise<(import("mongoose").Document<unknown, {}, TaskDocument, {}, {}> & Task & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
