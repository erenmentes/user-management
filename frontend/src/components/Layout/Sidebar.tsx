import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const menuItems: any = {
    'Tasks': [
        { name: 'My Tasks', href: '/mytasks' },
        { name: 'My Team\'s Tasks', href: '/teamtasks' },
    ],
    'Teams': [
        { name: 'My Teams', href: '/teams' },
        { name: 'Create Team', href: '/createteam' },
    ],
};

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [decoded, setDecoded] = useState<CustomJwtPayload | null>(null);
    const [userDropdown, setUserDropdown] = useState(false);

    const navigate = useNavigate();

    interface CustomJwtPayload extends JwtPayload {
        username: string;
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = localStorage.getItem("token");
                if (result) {
                    const decoded = jwtDecode<CustomJwtPayload>(result);
                    setDecoded(decoded);
                };
            } catch (error) {
                console.log(error);
            };
        };
        fetchUser();
    }, []);

    const handleDropdownToggle = (key: string) => {
        setOpenDropdown(openDropdown === key ? null : key);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <>
            
            <button
                onClick={() => setIsSidebarOpen(true)}
                className="fixed top-4 left-4 z-50 p-2 rounded-full md:hidden bg-zinc-800 text-white shadow-lg"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                    />
                </svg>
            </button>

            
            <div
                onClick={() => setIsSidebarOpen(false)}
                className={`fixed inset-0 z-40 bg-black/50 md:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
            />

           
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static min-h-screen ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } bg-zinc-900 p-6 shadow-xl flex flex-col border-r`}
            >
                <div className="flex flex-col">
                    <h2 className="text-2xl mb-8 text-center font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-rose-500 text-transparent bg-clip-text">
                        Dashboard
                    </h2>

                    <nav>
                        <ul className="space-y-4">
                            {Object.keys(menuItems).map((key) => (
                                <li key={key}>
                                    <button
                                        onClick={() => handleDropdownToggle(key)}
                                        className="w-full flex justify-between items-center p-3 rounded-lg text-lg font-medium text-zinc-100 hover:bg-gray-700 hover:cursor-pointer transition-colors duration-200"
                                    >
                                        <span>{key}</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-5 w-5 transform transition-transform duration-200 ${openDropdown === key ? 'rotate-180' : ''
                                                }`}
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>

                                    <ul
                                        className={`pl-4 mt-2 space-y-1 overflow-hidden transition-all duration-300 ${openDropdown === key ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        {menuItems[key].map((item: any) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    onClick={() => setIsSidebarOpen(false)}
                                                    className="flex items-center p-2 rounded-lg text-sm font-medium text-zinc-400 hover:bg-zinc-800 transition-colors duration-200 border-b-2 border-zinc-800"
                                                >
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>

                        <div className="relative mt-10">
                            <button
                                onClick={() => setUserDropdown(!userDropdown)}
                                className="flex items-center justify-between w-full p-3 rounded-lg text-gray-400 text-2xl hover:bg-zinc-800 transition hover:cursor-pointer"
                            >
                                <span>{decoded?.username}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-5 w-5 ml-2 transform transition-transform duration-200 ${userDropdown ? 'rotate-180' : ''}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>

                            {userDropdown && (
                                <div className="absolute left-0 w-full bg-zinc-800 rounded-lg mt-2 shadow-lg border border-zinc-700">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left p-3 text-zinc-300 hover:bg-zinc-700 rounded-lg hover:cursor-pointer"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
