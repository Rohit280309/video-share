"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useUserContext } from "@/context/userContext"
import Link from "next/link"
import { toast } from "sonner"



export default function LoginPage() {

    const router = useRouter();
    const { setUser } = useUserContext();
    const [data, setData] = useState<Object>({
        username: "",
        email: "",
        password: ""
    });

    const handleLogin: any = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/auth/login", data);
            console.log(response.data);
            toast.success("Login Successfull");

            const user = await axios.get("/api/user/getUserInfo");
            setUser(user.data.message);

            router.push("/");
        } catch (error: any) {
            toast.error("Login Failed");
            console.log("Login Failed", error.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen dark">
            <form className="bg-black bg-opacity-80 shadow-lg rounded px-8 pt-6 pb-8 mb-4 lg:w-[800px] sm:w-[300px] md:w-[600px]">
                <h1 className="text-white text-5xl font-bold text-center">Login</h1>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="username">Username:</label>
                    <Input id="username" onChange={(e) => setData({ ...data, username: e.target.value })} type="text" placeholder="Username" className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="email">Email:</label>
                    <Input id="email" onChange={(e) => setData({ ...data, email: e.target.value })} type="email" placeholder="Email" className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="password">Password:</label>
                    <Input id="password" onChange={(e) => setData({ ...data, password: e.target.value })} type="password" placeholder="Password" className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2">Don't have an account ? <Link href={"/signup"}>SignUp</Link></label>
                </div>
                <Button onClick={handleLogin} className="bg-green-500 hover:bg-green-700">Login</Button>
            </form>
        </div>

    )
}
