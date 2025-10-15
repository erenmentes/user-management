import { useEffect, useState } from "react"
import Sidebar from "../components/Layout/Sidebar"
import { myTasks } from "../api/tasks";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";

const Dashboard = () => {

    interface Task {
        id: string;
        title: string;
        description: string;
        assignedTo: string;
        team: string;
    };

    const [myTasksList, setMyTasksList] = useState<Task[]>([]);

    interface CustomJwtPayload extends JwtPayload {
        username: string;
    };

    const jwtToken = localStorage.getItem("token");
    useEffect(() => {
        const fetchTasks = async () => {

            if (jwtToken) {
                const decoded = jwtDecode<CustomJwtPayload>(jwtToken);
                const user = decoded.username;
                const result = await myTasks(user, jwtToken);

                console.log(result);
                setMyTasksList(result.data);
            };
        };
        fetchTasks();
    }, []);

    const handleUpdate = (id: string) => {

    };

    const handleDelete = (id: string) => {

    };

    const handleDone = (id: string) => {

    };

    return (
        <div className="flex bg-zinc-950">
            <Sidebar />
            <div className="flex-1 p-8 lg:p-12 text-white">
                <div className="flex flex-col max-w-4xl">
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 text-white">
                        Your Tasks
                    </h1>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {Array.isArray(myTasksList) && myTasksList.length > 0 ? (
                            myTasksList.map((t, index) => (
                                <div
                                    key={index}
                                    className="bg-zinc-900 p-5 rounded-xl shadow-lg border border-zinc-800 
                                   hover:shadow-lg hover:shadow-indigo-500/30 transition duration-300
                                   flex flex-col h-full cursor-pointer"
                                >
                                    <h2 className="text-xl font-semibold mb-2 text-indigo-300 line-clamp-2">
                                        {t.title}
                                    </h2>
                                    <p className="text-sm text-gray-400 line-clamp-3 flex-grow">
                                        {t.description}
                                    </p>

                                    <div className="flex gap-2 mt-4">
                                        <button className="py-1 px-2 bg-blue-600 rounded-2xl" onClick={() => handleUpdate(t.id)}>Update</button>
                                        <button className="py-1 px-2 bg-rose-600 rounded-2xl" onClick={() => handleDelete(t.id)}>Delete</button>
                                        <button className="py-1 px-2 bg-green-600 rounded-2xl" onClick={() => handleDone(t.id)}>Done</button>
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

                    <LineChart width={600} height={300} data={myTasksList} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="uv" stroke="purple" strokeWidth={2} name="My data series name" />
                        <XAxis dataKey="name" />
                        <YAxis width="auto" label={{ value: 'UV', position: 'insideLeft', angle: -90 }} />
                        <Legend align="right" />
                    </LineChart>
                </div>
            </div>
        </div>
    )
}

export default Dashboard