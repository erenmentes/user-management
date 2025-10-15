export interface TasksDto {
    id : number,
    title : string,
    description : string,
    createdAt : Date,
    updatedAt : Date,
    assignedTo : string,
    team : string,
    author : string
};