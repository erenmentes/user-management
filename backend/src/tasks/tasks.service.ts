import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { TaskActionDto } from './dto/task-action.dto';
import { Task, TaskDocument } from './schemas/tasks.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

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
        return await this.taskModel.findOne({ author: username });
    };

    async deleteTask(id: string, username: string) {
        // if username equals with tasks' owner, will delete task that which is ID.
        const task = await this.taskModel.findById(id);
        if (!task) {
            throw new NotFoundException();
        };

        if (task.author !== username) {
            throw new ForbiddenException('You are not allowed to delete this task.');
        };

        return this.taskModel.findByIdAndDelete(id);
    };
};