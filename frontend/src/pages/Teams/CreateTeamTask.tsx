import { useState } from "react"
import Sidebar from "../../components/Layout/Sidebar"
import { createTask, type ITaskCreate } from "../../api/tasks";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-hot-toast';

const CreateTeamTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignedTo, setAssignedTo] = useState("");

    const jwtToken = localStorage.getItem("token");
    const { team } = useParams();

    const navigate = useNavigate();

    const handleCreate = async () => {
        try {
            if (team) {
                const newTask: ITaskCreate = {
                    title: title,
                    description: description,
                    assignedTo: assignedTo,
                    team: team
                }
                await createTask(newTask, jwtToken);
                toast.success("Team task created successfully!");
                navigate("/");
            }
        } catch (error) {
            toast.error("Failed to create team task.");
        };
    };

    return (
        <div className="flex min-h-screen bg-zinc-950">
            <Sidebar />
            <div className="flex items-center justify-center text-center mx-auto">
                <div className="flex flex-col text-white overflow-y-auto">
                    <h1 className='text-5xl font-bold'>Create Team Task</h1>
                    <div className="max-w-120 bg-zinc-800 p-6 flex flex-col justify-center rounded-lg mt-4 ml-1 mr-1">
                        <div className="flex flex-col text-start">
                            <label className="text-xl font-bold">Task Title</label>
                            <input type="text" className="border bg-zinc-700 border-zinc-900 rounded-lg p-1" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="flex flex-col text-start mt-4">
                            <label className="text-xl font-bold">Task Description</label>
                            <textarea name="" id="" cols={30} rows={10} className="border bg-zinc-700 border-zinc-900 rounded-lg" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="flex flex-col text-start mt-4">
                            <label className="text-lg font-bold">Assigned To (if you want to assign to someone)</label>
                            <input type="text" className="border bg-zinc-700 border-zinc-900 rounded-lg p-1" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} />
                        </div>
                        <input type="hidden" name="" value={team} />
                        <button className="bg-green-600 w-fit px-4 py-2 rounded-full mx-auto mt-4 text-xl" onClick={handleCreate}>Create</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateTeamTask