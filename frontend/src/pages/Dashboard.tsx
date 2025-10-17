import { useEffect, useState } from "react"
import Sidebar from "../components/Layout/Sidebar"
import { deleteTask, fetchWeeklyStats, myTasks, setTaskDone, setTaskInProgress } from "../api/tasks";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { toast } from 'react-hot-toast';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import { getMyTeams } from "../api/teams";

interface Task {
    _id: string;
    title: string;
    description: string;
    assignedTo: string;
    team: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
};

interface Team {
    name: string,
    members: Array<string>,
    createdBy: string;
}

const Dashboard = () => {
    const [myTasksList, setMyTasksList] = useState<Task[]>([]);
    const [weeklyStats, setWeeklyStats] = useState<any[]>([]);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [teams, setTeams] = useState([]);
    const [username, setUsername] = useState("");

    const navigate = useNavigate();

    interface CustomJwtPayload extends JwtPayload {
        username: string;
    };

    const jwtToken = localStorage.getItem("token");
    useEffect(() => {
        if (jwtToken) {
            const decoded = jwtDecode<CustomJwtPayload>(jwtToken);
            setUsername(decoded.username);
        };
    }, [jwtToken])


    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const result = await getMyTeams(jwtToken);
                console.log(result.data);
                setTeams(result.data);
            } catch (error) {
                console.error("Error while fetching my teams :", error);
            };
        };
        fetchTeams();
    }, [jwtToken, refreshTrigger]);

    useEffect(() => {
        const fetchTasks = async () => {
            if (jwtToken) {
                const decoded = jwtDecode<CustomJwtPayload>(jwtToken);
                const user = decoded.username;
                const result = await myTasks(user, jwtToken);
                setMyTasksList(result.data);
            };
        };
        fetchTasks();
    }, [jwtToken, refreshTrigger]);

    useEffect(() => {
        const fetchTasksAndStats = async () => {
            if (jwtToken) {
                const statsResult = await fetchWeeklyStats(jwtToken);
                if (statsResult?.data) {
                    setWeeklyStats(statsResult.data);
                } else {
                    setWeeklyStats([]);
                };
            };
        };
        fetchTasksAndStats();
    }, [jwtToken, refreshTrigger]);

    const handleDone = async (id: string) => {
        try {
            if (jwtToken) {
                await setTaskDone(id, jwtToken);
                setRefreshTrigger(prev => prev + 1);
                toast.success('Task marked as done.');
            } else {
                toast.error('JWT Token not found.');
            };
        } catch (error) {
            toast.error('Failed to mark task as done.');
        };
    };

    const handleUpdate = (id: string) => {
        navigate(`/tasks/update/${id}`);
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
            setRefreshTrigger(prev => prev + 1);
            toast.success('Task set to in-progress.');
        } catch (error) {
            toast.error('Failed to set task in-progress.');
        };
    };

    return (
        <div className="flex min-h-screen bg-zinc-950">
            <Sidebar />

            <div className="flex-1 p-4 sm:p-8 lg:p-12 text-white overflow-y-auto">
                <div className="flex flex-col max-w-full mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8">

                        <div className="flex-grow">
                            <h2 className="text-5xl font-semibold mb-6 text-white border-b border-zinc-700 pb-2">
                                Your Tasks
                            </h2>
                            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                                {Array.isArray(myTasksList) && myTasksList.length > 0 ? (
                                    myTasksList.map((t, index) => (
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
                                                <div>
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
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full p-10 bg-gray-800/50 rounded-lg text-center">
                                        <p className="text-xl text-gray-400">
                                            No tasks yet.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>


                        <div className="lg:w-1/3 lg:min-w-[400px] flex-shrink-0">
                            <div className="p-6 bg-zinc-900 rounded-xl shadow-2xl h-full max-h-120 flex flex-col">
                                <h2 className="text-2xl font-semibold mb-4 text-indigo-400 border-b border-zinc-700 pb-2">
                                    Tasks completed in last 7 days
                                </h2>

                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={weeklyStats}
                                        margin={{ top: 15, right: 10, left: -15, bottom: 5 }}>

                                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                        <XAxis
                                            dataKey="date"
                                            stroke="#94a3b8"
                                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                                        />
                                        <YAxis
                                            stroke="#94a3b8"
                                            allowDecimals={false}
                                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                                        />

                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#18181b',
                                                border: '1px solid #444',
                                                color: '#fff',
                                            }}
                                            labelStyle={{ color: '#ccc', fontWeight: 'bold' }}
                                            formatter={(value) => [`${value} Task(s)`, 'Completed']}
                                        />

                                        <Legend wrapperStyle={{ paddingTop: '10px', color: '#ccc' }} />

                                        <Bar dataKey="completedCount" name="Completed" fill="#6366f1" radius={[4, 4, 0, 0]} />

                                    </BarChart>
                                </ResponsiveContainer>

                                <button
                                    onClick={() => setRefreshTrigger(prev => prev + 1)}
                                    className="mt-4 flex items-center justify-center gap-2 p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm text-indigo-400 transition"
                                >
                                </button>
                            </div>
                            <div className="lg:w-1/3 lg:min-w-[400px] flex-shrink-0">
                                <div className="p-6 bg-zinc-900 rounded-xl shadow-2xl h-full flex flex-col mt-4">
                                    <h2 className="text-2xl font-semibold mb-4 text-indigo-400 border-b border-zinc-700 pb-2">
                                        Your Teams
                                    </h2>
                                    <div className="overflow-x-auto rounded-xl shadow-2xl border border-zinc-800 bg-zinc-900">
                                        <table className="min-w-full divide-y divide-zinc-700">
                                            <thead>
                                                <tr className="bg-zinc-800 text-left text-xs font-semibold uppercase tracking-wider">
                                                    <th className="py-3 px-4 text-indigo-400">
                                                        Team Name
                                                    </th>
                                                    <th className="py-3 px-4 text-center text-indigo-400">
                                                        Total Members
                                                    </th>
                                                    <th className="py-3 px-4 text-center text-indigo-400">
                                                        Rank
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-zinc-800">
                                                {teams.length > 0 ? (
                                                    teams.map((t: Team, index: number) => (
                                                        <tr
                                                            key={index}
                                                            className="text-sm text-gray-300 hover:bg-zinc-800/50 transition duration-150"
                                                        >
                                                            <td className="py-3 px-4 font-medium text-white">
                                                                {t.name}
                                                            </td>
                                                            <td className="py-3 px-4 text-center">
                                                                <span className="inline-flex items-center justify-center 
                                            bg-indigo-600/20 text-indigo-300 
                                            h-6 w-6 rounded-full text-xs font-bold">
                                                                    {t.members.length}
                                                                </span>
                                                            </td>
                                                            {t.createdBy === username ? (
                                                                <td className="text-rose-600 text-center">Owner</td>
                                                            ) : (
                                                                <td className="text-center">Member</td>
                                                            )}
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={2} className="py-4 text-center text-gray-500">
                                                            No teams found.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard