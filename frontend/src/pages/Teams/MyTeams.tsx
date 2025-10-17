import { useEffect, useState } from "react";
import Sidebar from "../../components/Layout/Sidebar"
import { disbandTeam, getMyTeams } from "../../api/teams";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { NotebookText, Trash2Icon, User2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Team {
    name: string;
    members: Array<string>;
    createdBy: string;
};

interface CustomJwtPayload extends JwtPayload {
    username: string;
};

const MyTeams = () => {

    const [teams, setTeams] = useState([]);
    const [username, setUsername] = useState("");

    const jwtToken = localStorage.getItem("token");

    const navigate = useNavigate();

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
        if (jwtToken) {
            const decoded = jwtDecode<CustomJwtPayload>(jwtToken);
            const username = decoded.username;
            setUsername(username);
        };
        fetchTeams();
    }, [jwtToken]);

    const handleTasks = (team: string) => {
        navigate(`/tasks/team/${team}`);
    };

    const handleManageMembers = (team : string) => {
        navigate(`/${team}/manage-members`);
    };

    const handleDisband = async (team : string) => {
        try {
            await disbandTeam(team,jwtToken);
        } catch (error) {
            console.error("Something went wrong while disbanding the team : ",error);
        };
    };

    return (
        <div className="flex min-h-screen bg-zinc-950">
            <Sidebar />
            <div className="flex-1 p-4 sm:p-8 lg:p-12 text-white overflow-y-auto">
                <h1 className='text-5xl font-bold'>Your Teams</h1>
                <div className="overflow-x-auto rounded-xl shadow-2xl border border-zinc-800 bg-zinc-900 mt-4">
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
                                {teams.length > 0 ? (
                                    teams.map((t: Team, index) => (
                                        t.createdBy === username ? (
                                            <th key={index} className="py-3 px-4 text-center text-indigo-400">settings</th>
                                        ) : (
                                            <></>
                                        )
                                    ))
                                ) : (
                                    <></>
                                )}
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
                                        <td className="py-3 px-4 font-medium text-white">
                                            {t.createdBy === username ? (
                                                <div className="text-center text-rose-500">Owner</div>
                                            ) : (
                                                <div className="text-center text-green-500">Member</div>
                                            )}
                                        </td>
                                        {t.createdBy === username ? (
                                            <>
                                                <td className="py-3 px-4 font-medium text-white text-center">
                                                    <button
                                                        onClick={() => handleTasks(t.name)}
                                                        className="bg-green-500 p-2 rounded-lg flex items-center justify-center gap-1 mx-auto"
                                                    >
                                                        <NotebookText /> Tasks
                                                    </button>
                                                </td>
                                                <td className="py-3 px-4 font-medium text-white text-center">
                                                    <button
                                                        onClick={() => handleManageMembers(t.name)}
                                                        className="bg-orange-500 p-2 rounded-lg flex items-center justify-center gap-1 mx-auto"
                                                    >
                                                        <User2Icon /> Manage Members
                                                    </button>
                                                </td>
                                                <td className="py-3 px-4 font-medium text-white text-center">
                                                    <button
                                                        onClick={() => handleDisband(t.name)}
                                                        className="bg-rose-500 p-2 rounded-lg flex items-center justify-center gap-1 mx-auto"
                                                    >
                                                        <Trash2Icon /> Disband Team
                                                    </button>
                                                </td>
                                            </>
                                        ) : (
                                            <></>
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
    )
}

export default MyTeams