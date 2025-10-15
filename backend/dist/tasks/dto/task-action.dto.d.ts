export interface TaskActionDto {
    title: string;
    description: string;
    assignedTo: string;
    team: string | undefined;
}
