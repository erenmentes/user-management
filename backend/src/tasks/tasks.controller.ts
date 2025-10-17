import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TasksService, TaskStatus } from './tasks.service';
import type { TaskActionDto } from './dto/task-action.dto';
import { User } from 'src/auth/user.decorator';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { };

    @UseGuards(AuthGuard)
    @Post('create')
    async createTask(@Body() taskActionDto: TaskActionDto, @User() user: any) {
        return await this.tasksService.createTask(taskActionDto, user.username);
    };

    @UseGuards(AuthGuard)
    @Patch('update/:id')
    async updateTask(@Body() taskActionDto: TaskActionDto, @User() user: any, @Param('id') id: string) {
        return await this.tasksService.updateTask(taskActionDto, id, user.username);
    };

    @UseGuards(AuthGuard)
    @Get('all')
    async getAllTasks() {
        return await this.tasksService.getAllTasks();
    };

    @Get('weekly-stats')
    @UseGuards(AuthGuard)
    async getWeeklyStats(@User() user : any) {
        const username = user.username;
        return this.tasksService.getWeeklyCompletedStats(username);
    };

    @UseGuards(AuthGuard)
    @Patch('set-task-status/:id')
    async setTaskStatus(@Param('id') id : string,@Body('status') status : TaskStatus,@User() user : any) {
        const username = user.username;
        return this.tasksService.setTaskStatus(id,status,username);
    };

    @UseGuards(AuthGuard)
    @Get('team/:team')
    async getTeamTasks(@Param('team') team: string) {
        return await this.tasksService.getTeamTasks(team);
    };

    @UseGuards(AuthGuard)
    @Get(':id')
    async getTaskById(@Param('id') id: string) {
        return await this.tasksService.getTaskById(id);
    };

    @UseGuards(AuthGuard)
    @Get('user/:id')
    async getTasksByUser(@Param('id') id: string) {
        return await this.tasksService.getTasksByUser(id);
    };

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteTask(@Param('id') id: string, @User() user: any) {
        return await this.tasksService.deleteTask(id, user.username);
    };

};
