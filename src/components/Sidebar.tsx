"use client";
// import useTab from '@/context/useTab';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Sidebar() {

    const router = useRouter();
    const pathname = usePathname();

    let initialTab = pathname.split("/")[1] !== "" ? pathname.split("/")[1] : "home";

    const [selectedTab, setSelectedTab] = useState<String>(initialTab);

    const handleTabClick = (tabName: String) => {
        setSelectedTab(tabName);
        tabName === "home" ? router.push("/") : router.push(`/${tabName}`);
    };

    return (
        <>
            <div className="md:w-[250px] w-[80px] mt-[90px] fixed h-screen min-h-screen text-white overflow-auto">
                <div
                    className={`flex items-center cursor-pointer mr-4 ml-4 mt-5 hover:bg-side-gray-2 rounded-lg h-[40px] ${selectedTab === 'home' ? 'bg-side-gray-1' : ''}`}
                    onClick={() => handleTabClick('home')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-2">
                        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                    </svg>
                    <label className="ml-10 cursor-pointer md:flex hidden" htmlFor="home">Home</label>
                </div>

                <div
                    className={`flex items-center cursor-pointer mr-4 ml-4 hover:bg-side-gray-2 rounded-lg h-[40px] ${selectedTab === 'subscriptions' ? 'bg-side-gray-1' : ''}`}
                    onClick={() => handleTabClick('subscriptions')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-2">
                        <path fillRule="evenodd" d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                    </svg>
                    <label className="ml-10 cursor-pointer md:flex hidden" htmlFor="subscription">Subscriptions</label>
                </div>

                <div className="border-b md:w-[230px] w-[55px] ml-2 mt-3 border-new-gray"></div>

                <div className=' mr-4 ml-4 mt-5'>
                    <h2>{"You >"}</h2>
                </div>

                <div
                    className={`flex items-center cursor-pointer mt-4 mr-4 ml-4 hover:bg-side-gray-2 rounded-lg h-[40px] ${selectedTab === 'profile' ? 'bg-side-gray-1' : ''}`}
                    onClick={() => handleTabClick('profile')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-2">
                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                    </svg>
                    <label className="ml-10 cursor-pointer md:flex hidden" htmlFor="profile">Profile</label>
                </div>

                <div
                    className={`flex items-center cursor-pointer mt-1 mr-4 ml-4 hover:bg-side-gray-2 rounded-lg h-[40px] ${selectedTab === 'upload-video' ? 'bg-side-gray-1' : ''}`}
                    onClick={() => handleTabClick('upload-video')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <label className="ml-10 cursor-pointer md:flex hidden" htmlFor="profile">Create</label>
                </div>

                <div
                    className={`flex items-center cursor-pointer mt-1 mr-4 ml-4 hover:bg-side-gray-2 rounded-lg h-[40px] ${selectedTab === 'history' ? 'bg-side-gray-1' : ''}`}
                    onClick={() => handleTabClick('history')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-2">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                    </svg>
                    <label className="ml-10 cursor-pointer md:flex hidden" htmlFor="profile">History</label>
                </div>

                <div
                    className={`flex items-center cursor-pointer mt-1 mr-4 ml-4 hover:bg-side-gray-2 rounded-lg h-[40px] ${selectedTab === 'watchlater' ? 'bg-side-gray-1' : ''}`}
                    onClick={() => handleTabClick('watchlater')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-2">
                        <path d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
                    </svg>
                    <label className="ml-10 cursor-pointer md:flex hidden" htmlFor="profile">Watch Later</label>
                </div>

                {/* <div
                    className={`flex items-center cursor-pointer mt-1 mr-4 ml-4 hover:bg-side-gray-2 rounded-lg h-[40px] ${selectedTab === 'likedvideos' ? 'bg-side-gray-1' : ''}`}
                    onClick={() => handleTabClick('likedvideos')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-2">
                        <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                    </svg>
                    <label className="ml-10 cursor-pointer md:flex hidden" htmlFor="profile">Liked Videos</label>
                </div> */}

                <div className="border-b md:w-[230px] w-[55px] ml-2 mt-3 border-new-gray"></div>


            </div>
        </>
    );
}
