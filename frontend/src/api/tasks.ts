import axios from "axios"

export const myTasks = async (username : string,jwtToken : any) => {
    try {
        const result = await axios.get(`http://localhost:3000/tasks/user/${username}`,
            {headers : {
                Authorization : `Bearer ${jwtToken}`
            }}
        );
        return result;
    } catch (error) {
        throw error;
    };
};