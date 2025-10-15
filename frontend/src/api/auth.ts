import axios from "axios"

export const signUp = (username : string,password : string) => {
    try {
        axios.post("http://localhost:3000/auth/signup", {
            username,
            password
        });
    } catch (error) {
        console.log(error);
    };
};

export const logIn = async (username : string, password : string) => {
    try {
        const result = await axios.post("http://localhost:3000/auth/login", {
            username,
            password
        });
        return result;
    } catch (error) {
        throw error;
    }
};