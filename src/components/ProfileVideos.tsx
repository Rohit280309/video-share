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

export default function ProfileVideos({ videoId }: any) {
    const [video, setVideo] = useState<any>({});
    const [apiCalled, setApiCalled] = useState(false);

    useEffect(() => {
        axios.post("/api/user/getOneVideo", { videoId: videoId })
            .then((res: any) => {
                setVideo(res.data.message);
                setApiCalled(true);
            })
            .catch(err => console.log(err));
    }, []);

    const router = useRouter();

    const handleClick = () => {
        router.push(`/${video._id}`);
    }

    const shortenText = (description: String, length: string) => {
        const breakpoints = length.split(' '); // Split the string into an array of breakpoint classes
        const maxWidths = breakpoints.map(bp => {
            const value = bp.split('-')[2]; // Extract the numeric value from the class
            return parseInt(value.replace(/\D/g, '')); // Parse the numeric value and remove non-numeric characters
        });

        let maxLength = maxWidths[0]; // Default to the smallest value

        // Determine the appropriate maxLength based on the current screen size
        if (window.innerWidth >= 1280) {
            maxLength = maxWidths[2]; // lg
        } else if (window.innerWidth >= 768) {
            maxLength = maxWidths[1]; // md
        } else {
            maxLength = maxWidths[0]; // sm
        }

        if (description.length > maxLength) {
            return description.substring(0, maxLength) + '...';
        } else {
            return description;
        }
    };


    const handleDelete = () => {
        axios.delete(`/api/user/deleteUserVideo/?videoId=${videoId}`)
            .then(res => {
                console.log(res.data.message);
                toast.success("Video Deleted");
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
                                <div className="basis-1/2 md:basis-1/4 md:h-[150px] h-[90px]" style={{ position: 'relative' }} onClick={handleClick}>
                                    <img className="rounded-lg md:h-[150px] w-full h-[90px]" src={`/thumbnails/${video.thumbnail.split("\\").pop()}`} alt="Thumbnail" />
                                    <div className="rounded-lg" style={{ position: 'absolute', bottom: 0, right: 0, background: 'rgba(0, 0, 0, 0.5)', color: '#fff', padding: '4px 8px' }}>
                                        {video.duration}
                                    </div>
                                </div>

                                <div className="basis-1/2 md:basis-1/4 p-1">
                                    <div className="flex justify-between">
                                        <h2 className="md:text-2xl text-md">{shortenText(video.title, "sm:max-chars-20 md:max-chars-25 lg:max-chars-30")}</h2>
                                        <button onClick={handleDelete} className="text-white w-8 h-8 hover:bg-side-gray-1 rounded-full">
                                            <Tool
                                                title={
                                                    <svg className="w-6 h-6 m-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                }
                                                text="Delete video"
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
                                        <p className="text-xs text-mygray-1 mt-2">{shortenText(video.description, "sm:max-chars-20 md:max-chars-25 lg:max-chars-30")}</p>
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