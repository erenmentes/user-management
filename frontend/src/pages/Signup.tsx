import { useState } from 'react'
import '../styles/globals.css'
import {signUp} from "../api/auth.ts"
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSignup = () => {
        const signup = () => {
            try {
                if(username != "" && password != "") {
                    signUp(username,password);

                    setUsername("");
                    setPassword("");

                    navigate("/login");
                } else {
                    // will throw toast error that says "do not leave anything empty!".
                    console.log("noo")
                }
            } catch (error) {
                console.log(error);
            };
        };
        signup();
    };

    return (
        <div className='flex flex-col items-center justify-center text-center px-2 py-8 bg-black min-h-screen min-w-screen text-white'>
            <div className='text-center text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-rose-500 text-transparent bg-clip-text'>
                Signup
            </div>

            <div className='bg-neutral-950 w-96 h-84 mt-4 rounded-2xl text-start p-12 flex flex-col max-w-screen mx-4'>
                <div className='flex flex-col'>
                    <label className='font-bold'>Username</label>
                    <input value={username} type="text" className='border-2 border-neutral-800 rounded-lg p-1 mt-2' onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className='flex flex-col mt-8'>
                    <label className='font-bold'>Password</label>
                    <input value={password} type="password" className='border-2 border-neutral-800 rounded-lg p-1 mt-2' onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button onClick={handleSignup} className='bg-blue-600 w-fit px-4 py-2 rounded-2xl flex self-center mt-8 font-bold hover:cursor-pointer'>Signup</button>
            </div>
            <p className="mt-4">You already have an account? <a href="/login" className="text-blue-600">login</a>!</p>
        </div>
    )
}

export default Signup