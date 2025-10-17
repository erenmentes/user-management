import axios from "axios"
import { data } from "react-router-dom";

export const getMyTeams = async (jwtToken : any) => {
    try {
        const result = await axios.get(`http://localhost:3000/teams/myteams`,
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

export const createTeam = async (name : string,jwtToken : any) => {
    try {
        axios.post(`http://localhost:3000/teams/create`,
            {
                name
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

export const getMembers = async (team : string,jwtToken : any) => {
    try {
        const result = await axios.get(`http://localhost:3000/teams/${team}/members`,
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

export const removeMember = async (team : string,usernameToRemove : string,jwtToken : any) => {
    try {
        await axios.delete(`http://localhost:3000/teams/remove`,
            {
                headers : {
                    Authorization: `Bearer ${jwtToken}`
                },
                data : {
                    team,
                    usernameToRemove
                }
            },
        );
    } catch (error) {
        throw error;
    };
};

export const addMember = async (team : string, username : string,jwtToken :any) => {
    try {
        axios.post(`http://localhost:3000/teams/add`,
            {
                team,
                username
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

export const disbandTeam = async (team : string,jwtToken : any) => {
    try {
        await axios.delete(`http://localhost:3000/teams/delete/${team}`,
            {
                headers : {
                    Authorization: `Bearer ${jwtToken}`
                },
            },
        );
    } catch (error) {
      throw error;  
    };
};