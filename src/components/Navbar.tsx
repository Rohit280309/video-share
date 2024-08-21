"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/userContext";
import { LogOut } from "lucide-react";

export default function NavBar() {

    const { user } = useUserContext();
    const router = useRouter();

    const [apiCalled, setApiCalled] = useState<boolean>(false);
    const [showLogout, setShowLogout] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleLogout = () => {
        axios.get("/api/auth/logout")
            .then((res: any) => {
                router.push("/login");
            })
            .catch((err: any) => console.log(err));
    }

    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <>
            <nav className="flex items-center bg-my-bg text-white h-[60px] w-full fixed z-20">
                <div className="flex w-1/5 items-center justify-center mt-2 md:ml-5 md:mt-2 md:mr-5">
                    <img className="rounded-full w-[40px] h-[40px] md:mr-2" src="/image.png" />
                    <h1 className="hidden sm:block w-[80px] text-3xl">VideoShare</h1>
                </div>

                <div className="mt-2 w-1/2 flex items-center justify-end">
                    <Input
                        type="text"
                        className="bg-black bg-opacity-50 text-white rounded-full"
                        placeholder="Search"
                        value={searchQuery}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg onClick={handleSearch} className="absolute text-slate-400 h-8 w-8 p-1 mr-1 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
                {user.logo !== undefined && <div className="flex items-center justify-center cursor-pointer ml-2 mt-2 w-1/5 rounded" onClick={() => setShowLogout(!showLogout)}>
                    <img className="rounded-full w-[40px] h-[40px]" src={`/logo/${user.logo.split("\\").pop()}`} alt="logo" />
                    {showLogout && (
                        <div className="absolute top-full mt-2 bg-side-gray-2 text-red-500 p-2 rounded shadow-md" onClick={handleLogout}>
                           <div className="flex items-center gap-2">
                            Logout
                            <LogOut size={20} />
                           </div>
                        </div>
                    )}
                </div>}
            </nav>
        </>
    )
}