import { useEffect, useState } from "react"
import Sidebar from "../../components/Layout/Sidebar"
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-hot-toast';
import { getTaskById, updateTask } from "../../api/tasks";

interface Task {
    _id: string;
    title: string;
    description: string;
    assignedTo: string;
    team: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
};

const UpdateTask = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [task, setTask] = useState<Task>();

    const {id} = useParams();

    const jwtToken = localStorage.getItem("token");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(id) {
                    const result = await getTaskById(id,jwtToken);
                    console.log(result.data);
                    await setTitle(result.data.title);
                    await setDescription(result.data.description);
                    await setAssignedTo(result.data.assignedTo);
                } else {
                    toast.error("???");
                }
            } catch (error) {
                toast.error("Failed to fetch task.");
            }
        };
        fetchData();
    },[jwtToken]);

    const handleUpdate = async () => {
        try {
            if(id) {
                await updateTask(id,jwtToken,title,description,assignedTo,"none");
                toast.success("Task updated successfully!");
            } else {
                toast.error("???");
            };
        } catch (error) {
          toast.error("Failed to update task.");  
        };
    };

    return (
        <div className="flex min-h-screen bg-zinc-950">
            <Sidebar />
            <div className="flex items-center justify-center text-center mx-auto">
                <div className="flex flex-col text-white overflow-y-auto">
                    <h1 className='text-5xl font-bold'>Create Task</h1>
                    <div className="max-w-120 bg-zinc-800 p-6 flex flex-col justify-center rounded-lg mt-4 ml-1 mr-1">
                        <div className="flex flex-col text-start">
                            <label className="text-xl font-bold">Task Title</label>
                            <input type="text" className="border bg-zinc-700 border-zinc-900 rounded-lg p-1" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                        <div className="flex flex-col text-start mt-4">
                            <label className="text-xl font-bold">Task Description</label>
                            <textarea name="" id="" cols={30} rows={10} className="border bg-zinc-700 border-zinc-900 rounded-lg p-1" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="flex flex-col text-start mt-4">
                            <label className="text-lg font-bold">Assigned To (if you want to assign to someone)</label>
                            <input type="text" className="border bg-zinc-700 border-zinc-900 rounded-lg p-1" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}/>
                        </div>
                        <button className="bg-blue-600 w-fit px-4 py-2 rounded-full mx-auto mt-4 text-xl" onClick={handleUpdate}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateTask