"use client";
import React, { createContext } from "react";

export const TabContext = createContext<{
    currentTab: String,
    setCurrentTab: (tab: String) => void
}>({
    currentTab: "home",
    setCurrentTab: () => { },
})

export default function TabProvider({
    children,
}: {
    children: React.ReactNode
}) {

    return <TabContext.Provider value={{ currentTab: "home", setCurrentTab: () => {} }}>{children}</TabContext.Provider>
}

// export const TabProvider = TabContext.Provider;

// export default TabContext;

