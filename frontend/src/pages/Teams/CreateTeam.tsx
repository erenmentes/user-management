import { useState } from "react";
import Sidebar from "../../components/Layout/Sidebar"
import { createTeam } from "../../api/teams";
import { toast } from 'react-hot-toast';

const CreateTeam = () => {
    const [teamName, setTeamName] = useState("");

    const jwtToken = localStorage.getItem("token");

    const handleCreate = async () => {
        try {
            if(teamName != "") {
                await createTeam(teamName,jwtToken);
                toast.success("Team created successfully!");
            } else {
                toast.error("Do not leave anything empty.");
            }
        } catch (error) {
            toast.error("Failed to create team.");
        };
    };

    return (
        <div className="flex min-h-screen bg-zinc-950">
            <Sidebar />
            <div className="flex items-center justify-center text-center mx-auto">
                <div className="flex flex-col text-white overflow-y-auto">
                    <h1 className='text-5xl font-bold'>Create Team</h1>
                    <div className="max-w-120 bg-zinc-800 p-6 flex flex-col justify-center rounded-lg mt-4 ml-1 mr-1">
                        <div className="flex flex-col text-start">
                            <label className="text-xl font-bold">Name</label>
                            <input type="text" className="border bg-zinc-700 border-zinc-900 rounded-lg p-1" value={teamName} onChange={(e) => setTeamName(e.target.value)}/>
                        </div>
                        <button className="bg-green-600 w-fit px-4 py-2 rounded-full mx-auto mt-4 text-xl" onClick={handleCreate}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateTeam