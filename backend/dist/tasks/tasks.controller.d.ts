import { TasksService, TaskStatus } from './tasks.service';
import type { TaskActionDto } from './dto/task-action.dto';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    createTask(taskActionDto: TaskActionDto, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/tasks.schema").TaskDocument, {}, {}> & import("./schemas/tasks.schema").Task & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    updateTask(taskActionDto: TaskActionDto, user: any, id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/tasks.schema").TaskDocument, {}, {}> & import("./schemas/tasks.schema").Task & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getAllTasks(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/tasks.schema").TaskDocument, {}, {}> & import("./schemas/tasks.schema").Task & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getWeeklyStats(user: any): Promise<any[]>;
    setTaskStatus(id: string, status: TaskStatus, user: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/tasks.schema").TaskDocument, {}, {}> & import("./schemas/tasks.schema").Task & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getTeamTasks(team: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/tasks.schema").TaskDocument, {}, {}> & import("./schemas/tasks.schema").Task & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getTaskById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/tasks.schema").TaskDocument, {}, {}> & import("./schemas/tasks.schema").Task & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    getTasksByUser(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/tasks.schema").TaskDocument, {}, {}> & import("./schemas/tasks.schema").Task & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    deleteTask(id: string, user: any): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/tasks.schema").TaskDocument, {}, {}> & import("./schemas/tasks.schema").Task & import("mongoose").Document<unknown, any, any, Record<string, any>, {}> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
