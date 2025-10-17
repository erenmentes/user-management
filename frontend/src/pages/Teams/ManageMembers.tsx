import { useEffect, useState } from "react"
import Sidebar from "../../components/Layout/Sidebar"
import { useNavigate, useParams } from "react-router-dom";
import { getMembers, removeMember } from "../../api/teams";
import { PlusIcon } from "lucide-react";
import { toast } from 'react-hot-toast';

const ManageMembers = () => {

  const [members, setMembers] = useState<any[]>([]);
  const { team } = useParams();

  const navigate = useNavigate();

  const jwtToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        if (team) {
          const result = await getMembers(team, jwtToken);
          console.log(result);
          setMembers(result.data[0].members);
        } else {
          console.log("???");
        };
      } catch (error) {
        console.error("Something went wrong while fetching members : ", error);
      };
    };
    fetchMembers();
  }, []);

  const handleKick = async (m : string) => {
    try {
      if(team) {
        await removeMember(team,m,jwtToken);
        toast.success("Member removed successfully!");
      } else {
        toast.error("Team not found in URL.");
      };
    } catch (error) {
      toast.error("Failed to remove member.");
    };
  };

  const handleAddMember = async () => {
    navigate(`/team/${team}/add-members`);
  };

  return (
    <div className="flex min-h-screen bg-zinc-950">
      <Sidebar />
      <div className="flex-1 p-4 sm:p-8 lg:p-12 text-white overflow-y-auto">
        <div className="flex gap-2 flex-wrap">
          <h1 className='text-5xl font-bold text-white'>Manage Members</h1>
          <button onClick={handleAddMember} className="flex items-center text-center justify-center bg-green-500 rounded-lg px-2"><PlusIcon/> Add new member</button>
        </div>
        <div className="overflow-x-auto rounded-xl shadow-2xl border border-zinc-800 bg-zinc-900 mt-4">
          <table className="min-w-full divide-y divide-zinc-700">
            <thead>
              <tr className="bg-zinc-800 text-left text-xs font-semibold uppercase tracking-wider">
                <th className="py-3 px-4 text-indigo-400">Username</th>
                <th className="py-3 px-4 text-center text-indigo-400">Settings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {members.length > 0 ? (
                members.map((m, index) => (
                  <tr key={index} className="text-sm text-gray-300 hover:bg-zinc-800/50 transition duration-150">
                    <td className="py-3 px-4 font-medium text-white">{m}</td>
                    <td className="py-3 px-4 text-center">
                      <button onClick={() => handleKick(m)} className="bg-rose-500 text-white px-2 py-1 rounded-lg hover:bg-green-600 transition">
                        Kick User
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="py-4 text-center text-gray-500">
                    No members found.
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

export default ManageMembers