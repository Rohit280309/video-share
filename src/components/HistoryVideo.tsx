"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import LoadingBar from "./LoadingBar";
import { Skeleton } from "./ui/skeleton";
import { formatDate } from "@/helpers/formatDate";
import { formatNumber } from "@/helpers/formatNumber";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Tool from "./Tool";
import { toast } from "sonner";

export default function HistoryVideo({ videoId }: any) {
    const [video, setVideo] = useState<any>({});
    const [apiCalled, setApiCalled] = useState(false);

    useEffect(() => {
        axios.post("/api/user/getOneVideo", { videoId: videoId })
            .then((res: any) => {
                setVideo(res.data.message);
                console.log(res.data.message)
                setApiCalled(true);
            })
            .catch(err => console.log(err));
    }, []);

    const router = useRouter();

    const handleClick = () => {
        router.push(`/${video._id}`);
    }

    const shortenText = (description: String, length: any) => {
        const maxLength = length;
        if (description.length > maxLength) {
            return description.substring(0, maxLength) + '...';
        } else {
            return description;
        }
    };

    const handleDelete = () => {
        axios.delete(`/api/user/deleteOneHistory/?videoId=${videoId}`)
            .then(res => {
                console.log(res.data.message);
                toast.success("Video removed from history")
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="text-white mt-10">
            {
                apiCalled ?
                    <div>
                        <div className="cursor-pointer">
                            <div className="flex mt-3">
                                <div className="w-[250px]" style={{ position: 'relative' }} onClick={handleClick}>
                                    <img className="rounded-lg w-[250px] h-[160px]" src={`/thumbnails/${video.thumbnail.split("\\").pop()}`} alt="Thumbnail" />
                                    <div className="rounded-lg" style={{ position: 'absolute', bottom: 0, right: 0, background: 'rgba(0, 0, 0, 0.5)', color: '#fff', padding: '4px 8px' }}>
                                        {video.duration}
                                    </div>
                                </div>

                                <div className="ml-3 w-[200px]">
                                    <div className="flex justify-between">
                                        <h2 className="text-2xl">{shortenText(video.title, "sm:max-chars-20 md:max-chars-25 lg:max-chars-30")}</h2>
                                        <button onClick={handleDelete} className="text-white w-8 h-8 hover:bg-side-gray-1 rounded-full">
                                            <Tool
                                                title={
                                                    <svg className="w-6 h-6 m-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                }
                                                text="Remove from history"
                                            />
                                        </button>
                                    </div>
                                    <div className="flex justify-between text-xs mt-1 text-mygray-1" onClick={handleClick}>
                                        <Link href="#" className="hover:text-grey-600">
                                            <p className="truncate text-overflow: ellipsis">{video.channelName}</p>
                                        </Link>
                                        <p>{`${formatNumber(video.views)[0]}${formatNumber(video.views)[1]} views`}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-mygray-1 mt-2">{shortenText(video.description, "sm:max-chars-20 md:max-chars-100 lg:max-chars-100")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    :
                    <div>
                        <div className="flex flex-col space-y-3 mb-4">
                            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    </div>
            }

        </div>
    );
}