"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import LoadingBar from "./LoadingBar";
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatNumber } from "@/helpers/formatNumber";
import { shortenText } from "@/helpers/shortenText";

const SideVideos = React.memo(({ videoId }: any) => {
    const [videos, setVideos] = useState([]);
    const router = useRouter();
    const [apiCalled, setApiCalled] = useState(false);

    useEffect(() => {
        axios.get("/api/video/getAllVideos")
            .then((res: any) => {
                setVideos(res.data.videos);
                setApiCalled(true);
            })
            .catch(err => console.log(err));
    }, []);

    const DisplayFormat = ({ videoId }: any) => {
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


        const handleClick = () => {
            router.push(`/${video._id}`);
        }

        // const shortenText = (description: String, length: any) => {
        //     const maxLength = length;
        //     if (description.length > maxLength) {
        //         return description.substring(0, maxLength) + '...';
        //     } else {
        //         return description;
        //     }
        // };

        return (
            <div className="text-white mb-2">
                {
                    apiCalled ?
                        <div>
                            <div className="cursor-pointer">
                                <div className="flex mt-3">
                                    <div className="w-[150px] h-[100px]" style={{ position: 'relative' }} onClick={handleClick}>
                                        <img className="rounded-lg w-[150px] h-[100px]" src={`/thumbnails/${video.thumbnail.split("\\").pop()}`} alt="Thumbnail" />
                                        <div className="rounded-lg" style={{ position: 'absolute', bottom: 0, right: 0, background: 'rgba(0, 0, 0, 0.5)', color: '#fff', padding: '4px 8px' }}>
                                            {video.duration}
                                        </div>
                                    </div>

                                    <div className="ml-3 w-[200px]">
                                        <h2 className="text-xl">{shortenText(video.title, "sm:max-chars-10 md:max-chars-15 lg:max-chars-30")}</h2>
                                        <div className="flex justify-between text-xs mt-1 text-mygray-1" onClick={handleClick}>
                                            <Link href="#" className="hover:text-grey-600">
                                                <p className="truncate text-overflow: ellipsis">{video.channelName}</p>
                                            </Link>
                                            <p>{`${formatNumber(video.views)[0]}${formatNumber(video.views)[1]} views`}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-mygray-1 mt-2">{shortenText(video.description, "sm:max-chars-20 md:max-chars-85 lg:max-chars-85")}</p>
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

    return (
        <div className="text-white mt-10">

            {apiCalled ? (
                videos.length > 0 ? (
                    <div className="flex flex-col ml-4">
                        {videos.map((video: any) => {
                            return video._id !== videoId && <DisplayFormat key={video._id} videoId={video._id} />
                        })}
                    </div>
                ) : (
                    <h2>No videos to display</h2>
                )


            ) : (
                // <div className="flex ml-[150px] items-center justify-center">
                //     <LoadingBar />
                // </div>
                <div className="flex flex-col items-center justify-center z-5">
                    <div className="flex flex-col space-y-3 mb-4">
                        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-3 mb-4">
                        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-3 mb-4">
                        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
})


export default SideVideos;