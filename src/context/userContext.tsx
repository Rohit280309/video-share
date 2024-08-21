"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<any>({});

export default function UserProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [user, setUser] = useState<any>({});
    
    useEffect(() => {
        axios.get("/api/user/getUserInfo")
            .then((res: any) => {
                console.log(res.data.message);
                console.log("Context called");

                // document.title = res.data.message.username;
                // console.log(res.data.message.logo)
                setUser(res.data.message);
                // setApiCalled(true);
            })
            .catch((err: any) => console.log(err));
    }, []);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>

}

export function useUserContext() {
    return useContext(UserContext);
}