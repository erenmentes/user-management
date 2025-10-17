import axios from "axios"

export interface ITaskCreate {
    title: string;
    description: string;
    assignedTo: string;
    team?: string;
};

export const myTasks = async (username: string, jwtToken: any) => {
    try {
        const result = await axios.get(`http://localhost:3000/tasks/user/${username}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
        );
        return result;
    } catch (error) {
        throw error;
    };
};

export const fetchWeeklyStats = async (jwtToken: any) => {
    try {
        const result = await axios.get(`http://localhost:3000/tasks/weekly-stats`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
        );
        return result;
    } catch (error) {
        throw error;
    };
};
export const setTaskDone = async (id: string, jwtToken: string) => {
    try {
        await axios.patch(
            `http://localhost:3000/tasks/set-task-status/${id}`,
            {
                status: 'DONE'
            },
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
        );
    } catch (error) {
        throw error;
    }
};

export const setTaskInProgress = async (id: string, jwtToken: any) => {
    try {
        await axios.patch(
            `http://localhost:3000/tasks/set-task-status/${id}`,
            {
                status: 'IN_PROGRESS'
            },
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
        );
    } catch (error) {
        throw error;
    }
};

export const deleteTask = async (id: string, jwtToken: any) => {
    try {
        await axios.delete(`http://localhost:3000/tasks/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
        );
    } catch (error) {
        throw error;
    };
};

export const createTask = async (createTaskDto: ITaskCreate, jwtToken: any) => {
    try {
        await axios.post(
            `http://localhost:3000/tasks/create`,
            {
                title: createTaskDto.title,
                description: createTaskDto.description,
                assignedTo: createTaskDto.assignedTo,
                team: createTaskDto.team
            },
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
        );
    } catch (error) {
        throw error;
    };
};

export const getMyTeamsTasks = async (jwtToken: any, team: string) => {
    try {
        const result = await axios.get(`http://localhost:3000/tasks/team/${team}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
        );
        return result;
    } catch (error) {
        throw error;
    };
};

export const getTaskById = async (id : string,jwtToken : any) => {
    try {
        const result = await axios.get(`http://localhost:3000/tasks/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            }
        );
        return result;
    } catch (error) {
        throw error;
    };
};

export const updateTask = async (id : string,jwtToken : any,title : string,description : string,assignedTo : string, team : string) => {
    try {
        await axios.patch(
            `http://localhost:3000/tasks/update/${id}`,
            {
                title,
                description,
                assignedTo,
                team
            },
            {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
        );
    } catch (error) {
        throw error;
    };
};