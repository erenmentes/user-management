import { PlusIcon } from 'lucide-react'
import Sidebar from '../../components/Layout/Sidebar'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteTask, getMyTeamsTasks, setTaskDone, setTaskInProgress } from '../../api/tasks';
import { toast } from 'react-hot-toast';

interface Task {
    _id: string;
    title: string;
    description: string;
    assignedTo: string;
    team: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
};

interface Team {
    name: string;
    members: Array<string>;
    createdBy: string;
};

const TeamTasks = () => {

    const [tasks, setTasks] = useState<Task[]>([]);

    const { team } = useParams();

    const navigate = useNavigate();

    const jwtToken = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (team) {
                    const result = await getMyTeamsTasks(jwtToken, team);
                    const data = result.data;
                    const normalized = Array.isArray(data) ? data : (data ? [data] : []);
                    setTasks(normalized);
                } else {
                    console.log("Team param missing");
                };
            } catch (error) {
                console.error("Something went wrong while fetching tasks : ", error);
            };
        };
        fetchData();
    }, [jwtToken, team]);

    const handleCreate = () => {
        navigate(`/tasks/team/${team}/create`);
    };

    const handleDone = async (id: string) => {
        try {
            if (jwtToken) {
                await setTaskDone(id, jwtToken);
                toast.success('Task marked as done.');
            } else {
                toast.error('JWT Token not found.');
            };
        } catch (error) {
            toast.error('Failed to mark task as done.');
        };
    };

    const handleUpdate = (id: string) => {
        navigate(`http://localhost:5173/update/${id}`);
    };

    const handleDelete = (id: string) => {
        try {
            deleteTask(id, jwtToken);
            toast.success('Task deleted.');
        } catch (error) {
            toast.error('Failed to delete task.');
        }
    };

    const handleInProgress = (id: string) => {
        try {
            setTaskInProgress(id, jwtToken);
            toast.success('Task set to in-progress.');
        } catch (error) {
            toast.error('Failed to set task in-progress.');
        };
    };

    return (
        <div className="flex min-h-screen bg-zinc-950">
            <Sidebar />
            <div className="flex-1 p-4 sm:p-8 lg:p-12 text-white overflow-y-auto">
                <div className='flex gap-4 flex-wrap'>
                    <h1 className='text-5xl font-bold'>Team Tasks</h1>
                    <button onClick={handleCreate} className='bg-green-500 flex items-center justify-center text-center rounded-lg font-bold px-2'><PlusIcon /> Create new</button>
                </div>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mt-4">
                    {tasks.length > 0 ? (
                        tasks.map((t, index) => (
                            <div
                                key={index}
                                className="bg-zinc-900 p-5 rounded-xl shadow-lg border-t-4 border-indigo-500 
                                            hover:shadow-xl hover:shadow-indigo-500/30 transition duration-300
                                            flex flex-col h-full"
                            >
                                <div className="flex items-center mt-auto justify-between">
                                    <h2 className="text-xl font-semibold mb-2 text-indigo-300 line-clamp-2">
                                        {t.title}
                                    </h2>
                                    <div className="flex justify-between items-center">
                                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${t.status === 'DONE' ? 'bg-green-600/20 text-green-400' :
                                            t.status === 'IN_PROGRESS' ? 'bg-yellow-600/20 text-yellow-400' :
                                                'bg-blue-600/20 text-blue-400'
                                            }`}>
                                            {t.status === 'DONE' ? (
                                                <span>DONE</span>
                                            ) : t.status === 'IN_PROGRESS' ? (
                                                <span>IN PROGRESS</span>
                                            ) : (
                                                <span>TODO</span>
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400 line-clamp-3 flex-grow mb-3">
                                    {t.description}
                                </p>

                                <div className="border-t border-zinc-800">
                                    <div className='flex items-center text-center justify-between'>
                                        {t.status === 'DONE' ? (
                                            <div className="mt-2">
                                                <button className="py-1 px-2 rounded-2xl bg-rose-600" onClick={() => handleDelete(t._id)}>Delete</button>
                                            </div>
                                        ) : t.status === 'IN_PROGRESS' ? (
                                            <div className="mt-2 gap-2 flex flex-wrap">
                                                <button className="py-1 px-2 rounded-2xl bg-blue-600" onClick={() => handleUpdate(t._id)}>Update</button>
                                                <button className="py-1 px-2 rounded-2xl bg-rose-600" onClick={() => handleDelete(t._id)}>Delete</button>
                                                <button className="py-1 px-2 rounded-2xl bg-green-600" onClick={() => handleDone(t._id)}>Mark as done</button>
                                            </div>
                                        ) : (
                                            <div className="mt-2 gap-2 flex flex-wrap">
                                                <button className="py-1 px-2 rounded-2xl bg-blue-600" onClick={() => handleUpdate(t._id)}>Update</button>
                                                <button className="py-1 px-2 rounded-2xl bg-rose-600" onClick={() => handleDelete(t._id)}>Delete</button>
                                                <button className="py-1 px-2 rounded-2xl bg-yellow-600" onClick={() => handleInProgress(t._id)}>I'm working on it!</button>
                                            </div>
                                        )}
                                        <span className='text-xs text-zinc-600 mt-4'>Assigned To : {t.assignedTo}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='text-xl mt-4 text-zinc-700'>No tasks found.</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TeamTasks