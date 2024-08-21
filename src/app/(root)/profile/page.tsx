"use client";

import HistoryVideo from "@/components/HistoryVideo";
import LoadingBar from "@/components/LoadingBar";
import ProfileVideos from "@/components/ProfileVideos";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/context/userContext";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Profile() {

    const { user, setUser } = useUserContext();
    const [apiCalled, setApiCalled] = useState<boolean>(false);
    const [hover, setHover] = useState<boolean>(false);
    const [search, setSearch] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [userVideos, setUserVideos] = useState<any>([]);


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleFileChange = (event: any) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = async (e: any) => {
        e.preventDefault();
        console.log(selectedFile);
        const formData: any = new FormData();
        formData.append("logo", selectedFile);

        try {
            const response = await axios.post('/api/user/editLogo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.message === "Profile Updated") {
                getUserInfo();
                closeModal();
            }

        } catch (error: any) {
            console.log(error);
        }

    };

    useEffect(() => {
        axios.get("/api/user/getUserVideos")
            .then((res: any) => {
                console.log(res.data.message)
                setUserVideos(res.data.message);
                setApiCalled(true);
            })
    }, [])

    const getUserInfo = () => {
        axios.get("/api/user/getUserInfo")
            .then((res: any) => {
                console.log(res.data.message);
                setUser(res.data.message);
            })
            .catch((err: any) => console.log(err));
    }


    return (
        <>
            <div className="mt-28">
                <div className="flex text-white">
                    <div className="mr-2 cursor-pointer md:w-[150px] md:h-[150px] w-[70px] h-[70px]" onClick={openModal} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} >
                        {hover ?
                            <div className="relative rounded-full md:w-[150px] md:h-[150px] w-[70px] h-[70px]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute top-[60px] left-[60px] w-6 h-6 z-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                </svg>
                                {user.logo !== undefined ? <img className="rounded-full md:w-[150px] md:h-[150px] w-[70px] h-[70px] opacity-30" src={`/logo/${user.logo.split("\\").pop()}`} alt="logo" />
                                    : <LoadingBar />}

                            </div>
                            :

                            user.logo !== undefined ? <img className="rounded-full md:w-[150px] md:h-[150px] w-[70px] h-[70px]" src={`/logo/${user.logo.split("\\").pop()}`} alt="logo" />
                                : <LoadingBar />
                        }
                    </div>
                    <div className="flex basis-2/4 items-center">
                        <p className="font-bold md:text-6xl text-3xl">{user.username}</p>
                    </div>
                </div>

                <div className="flex">
                    <div className="mt-4 cursor-pointer" onClick={() => setSearch(false)}>
                        <span className="text-white font-bold text-3 md:ml-20 ml-5">
                            Home
                            <div className="border-b w-[45px] mt-2 md:ml-20 ml-5 border-2 rounded-md"></div>
                        </span>

                    </div>
                    <div onClick={() => setSearch(!search)} className="flex mt-4 ml-4 cursor-pointer text-new-gray">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                    {
                        search ?
                            <input type="text" placeholder="Search" className="border-b bg-my-bg h-[30px] mt-3 mb-2 ml-3 text-white focus-visible:outline-none" />
                            : null
                    }
                </div>

                <div className="border-b w-full border-new-gray"></div>

                {
                    apiCalled ?

                        <div className="md:ml-5">
                            {
                                userVideos.map((videoId: any) => {
                                    return <div key={videoId}>
                                        <ProfileVideos videoId={videoId} />
                                    </div>
                                })
                            }

                        </div>

                        :

                        <div>
                            <LoadingBar />
                        </div>
                }

                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
                        <div className="bg-new-gray text-white p-8 rounded-lg shadow-lg">
                            <button onClick={closeModal} className="absolute top-0 right-0 p-2 m-2 text-my-bg hover:text-gray-800">
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="text-center">
                                <h2 className="text-xl font-bold mb-4">Update Profile</h2>
                                <p className="mb-4">Select a file:</p>
                                <Input className='bg-mg-bg cursor-pointer mb-4 shadow appearance-none border-my-bg rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline' type="file" accept="image/*" onChange={handleFileChange} />
                                <button onClick={handleFileUpload} className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">Upload profile</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* :

                <div className="flex h-screen items-center justify-center">
                    <LoadingBar />
                </div>
            } */}
        </>
    )

}