import NavBar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import TabProvider from "@/context/tabContext";
import UserProvider from "@/context/userContext";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <section>
            <UserProvider>
                <TabProvider>
                    <NavBar />
                    <div className="flex justify-between">
                        <Sidebar />
                        <div className="w-screen md:ml-[250px] ml-[10px] z-5">
                            {children}
                        </div>
                    </div>
                </TabProvider>
            </UserProvider>
        </section>
    );
}
