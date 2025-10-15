"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const tasks_schema_1 = require("./schemas/tasks.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let TasksService = class TasksService {
    taskModel;
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    ;
    async createTask(taskActionDto, username) {
        const createdTask = new this.taskModel({
            ...taskActionDto,
            author: username,
        });
        return await createdTask.save();
        ;
    }
    ;
    async updateTask(taskActionDto, id, username) {
        const task = await this.taskModel.findById(id);
        if (!task) {
            throw new common_1.NotFoundException();
        }
        ;
        if (task.author !== username) {
            throw new common_1.ForbiddenException('You are not allowed to edit this task.');
        }
        ;
        Object.assign(task, taskActionDto);
        return task.save();
    }
    ;
    async getAllTasks() {
        return await this.taskModel.find();
    }
    ;
    async getTaskById(id) {
        return await this.taskModel.findById(id);
    }
    ;
    async getTeamTasks(team) {
        return await this.taskModel.findOne({ team: team });
    }
    ;
    async getTasksByUser(username) {
        return await this.taskModel.findOne({ author: username });
    }
    ;
    async deleteTask(id, username) {
        const task = await this.taskModel.findById(id);
        if (!task) {
            throw new common_1.NotFoundException();
        }
        ;
        if (task.author !== username) {
            throw new common_1.ForbiddenException('You are not allowed to delete this task.');
        }
        ;
        return this.taskModel.findByIdAndDelete(id);
    }
    ;
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(tasks_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], TasksService);
;
//# sourceMappingURL=tasks.service.js.map