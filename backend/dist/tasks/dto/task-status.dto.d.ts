export interface TaskDoneDto {
    id: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
}
