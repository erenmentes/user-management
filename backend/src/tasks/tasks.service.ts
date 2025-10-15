import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { TaskActionDto } from './dto/task-action.dto';
import { Task, TaskDocument } from './schemas/tasks.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
};

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    ) { };

    async createTask(taskActionDto: TaskActionDto, username: string) {
        const createdTask = new this.taskModel({
            ...taskActionDto,
            author: username,
        });

        return await createdTask.save();;
    };

    async updateTask(taskActionDto: TaskActionDto, id: string, username: string) {
        const task = await this.taskModel.findById(id);

        if (!task) {
            throw new NotFoundException();
        };

        if (task.author !== username) {
            throw new ForbiddenException('You are not allowed to edit this task.');
        };

        Object.assign(task, taskActionDto);

        return task.save();
    };

    async getAllTasks() {
        return await this.taskModel.find();
    };

    async getTaskById(id: string) {
        return await this.taskModel.findById(id);
    };

    async getTeamTasks(team: string) {
        return await this.taskModel.findOne({ team: team })
    };

    async getTasksByUser(username: string) {
        return await this.taskModel.find({ author: username });
    };

    async deleteTask(id: string, username: string) {
        const task = await this.taskModel.findById(id);
        if (!task) {
            throw new NotFoundException();
        };

        if (task.author !== username) {
            throw new ForbiddenException('You are not allowed to delete this task.');
        };

        return this.taskModel.findByIdAndDelete(id);
    };

    async setTaskStatus(id: string, status: TaskStatus, username: string) {
        const task = await this.taskModel.findById(id);
        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found.`);
        };
        if (task.author !== username) {
            throw new ForbiddenException('You are not allowed to change status of this task.');
        };
        if (status === TaskStatus.DONE) {
            task.completedAt = new Date();
        };
        task.status = status;
        return await task.save();
    };

    // ai'a yazdirdim :)

    async getWeeklyCompletedStats(username: string): Promise<any[]> {
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        return this.taskModel.aggregate([
            // 1. Filtreleme: Yalnızca kullanıcının tamamladığı ve son 7 günde biten görevler.
            {
                $match: {
                    assignedTo: username,
                    status: TaskStatus.DONE,
                    completedAt: { $gte: sevenDaysAgo }
                }
            },
            // 2. Gruplama: completedAt alanından günü (dayOfYear veya dayOfWeek) alıp sayma.
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$completedAt" } },
                    count: { $sum: 1 }
                }
            },
            // 3. Formatlama ve Sıralama
            {
                $sort: { _id: 1 }
            },
            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    completedCount: "$count"
                }
            }
        ]).exec();
    }
};