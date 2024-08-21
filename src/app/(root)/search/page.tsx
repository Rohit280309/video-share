"use client";

import LoadingBar from "@/components/LoadingBar";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/helpers/formatDate";
import { formatNumber } from "@/helpers/formatNumber";
import { shortenText } from "@/helpers/shortenText";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function Search() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchResults, setSearchResults] = useState([]);
    const [apiCalled, setApiCalled] = useState<boolean>(false);

    useEffect(() => {
        const searchQuery = searchParams.get("q");
        if (searchQuery) {
            axios.get(`/api/search?query=${encodeURIComponent(searchQuery)}`)
                .then((response: any) => {
                    setSearchResults(response.data.message);
                    setApiCalled(true);
                })
                .catch((error: any) => {
                    console.error("Error fetching search results:", error);
                });
        }
    }, [searchParams.get("q")]);

    const DisplayResults = ({ videoId }: any) => {
        const [video, setVideo] = useState<any>({});
        const [apiCall, setApiCall] = useState<boolean>(false);
        useEffect(() => {
            axios.post("/api/user/getOneVideo", { videoId: videoId })
                .then((res: any) => {
                    setVideo(res.data.message);
                    setApiCall(true);
                })
        }, []);

        const handleClick = () => {
            router.push(`/${video._id}`);
        }

        return (
            <div className="text-white mb-2">
                {
                    apiCall ?
                        <div>
                            <div className="cursor-pointer">
                                <div className="flex mt-3 z-1">
                                <div className="w-[350px] h-[200px]" style={{ position: 'relative' }} onClick={handleClick}>
                                        <img className="rounded-lg w-[350px] h-[200px]" src={`/thumbnails/${video.thumbnail.split("\\").pop()}`} alt="Thumbnail" />
                                        <div className="rounded-lg" style={{ position: 'absolute', bottom: 0, right: 0, background: 'rgba(0, 0, 0, 0.5)', color: '#fff', padding: '4px 8px' }}>
                                            {video.duration}
                                        </div>
                                    </div>

                                    <div className="basis-1/2 ml-3 w-[200px]">
                                        <h2 className="text-2xl mb-4">{shortenText(video.title, "sm:max-chars-20 md:max-chars-25 lg:max-chars-30")}</h2>
                                        <div className="flex items-center text-xs mb-4 text-mygray-1" onClick={handleClick}>
                                            <img className="rounded-full w-[20px] h-[20px] mr-2" src={`/logo/${video.logo.split("\\").pop()}`} alt="logo" />
                                            <Link href="#" className="basis-1/4 hover:text-grey-600">
                                                <p className="truncate text-overflow: ellipsis">{video.channelName}</p>
                                            </Link>
                                        </div>
                                        <div className="flex text-xs mt-1 text-mygray-1" onClick={handleClick}>
                                            {/* <Link href="#" className="basis-1/4 hover:text-grey-600">
                                                <p className="truncate text-overflow: ellipsis">{video.channelName}</p>
                                            </Link> */}
                                            <p className="basis-1/4">{`${formatNumber(video.views)[0]}${formatNumber(video.views)[1]} views`}</p>
                                            <p className="basis-1/4">{`${formatDate(video.createdAt)}`}</p>
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
        )
    }

    return (
        <div className="text-white mt-28">
            <h1>Search Results</h1>
            <ul>
                {
                    apiCalled ?
                        searchResults.map((result: any) => (
                            <DisplayResults key={result._id} videoId={result._id} />
                        ))
                        :
                        <LoadingBar />
                }
            </ul>
        </div>
    );

}