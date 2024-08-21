"use client";

import HistoryVideo from "@/components/HistoryVideo";
import LoadingBar from "@/components/LoadingBar";
import { watchedAt } from "@/helpers/watchedAt";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function History() {
    const [watchHistory, setWatchHistory] = useState<any>({});
    const [apiCalled, setApiCalled] = useState<Boolean>(false);

    useEffect(() => {
        axios.get("/api/video/getHistory")
            .then(res => {
                const userHistory = res.data.message;
                const groupedVideos = groupAndCategorizeWatchedVideos(userHistory);
                setWatchHistory(groupedVideos);
                setApiCalled(true);
            })
            .catch(err => console.log(err));
    }, []);

    function groupAndCategorizeWatchedVideos(userHistory: any) {
        const groupedVideos: any = {};

        userHistory.forEach((item: any) => {
            const date = watchedAt(item.watchedAt);
            if (!groupedVideos[date]) {
                groupedVideos[date] = new Set();
            }
            groupedVideos[date].add(item.video);
        });

        for (const date in groupedVideos) {
            groupedVideos[date] = Array.from(groupedVideos[date]);
        }

        return groupedVideos;
    }

    function sortVideosByDate(groupedVideos: any) {
        const sortedDates = Object.keys(groupedVideos).sort((a, b) => {
            if (a === 'Today') return -1;
            if (a === 'Yesterday' && b !== 'Today') return -1;
            if (b === 'Today' || b === 'Yesterday') return 1;
            let left: any = new Date(b);
            let right: any = new Date(a);
            return left - right;
        });

        const sortedVideos: any = {};
        sortedDates.forEach(date => {
            sortedVideos[date] = groupedVideos[date];
        });

        return sortedVideos;
    }

    return (
        <>
            <div className="flex text-white mt-28 ml-20 relative">
                <div className="basis-1/2">
                    <p className="text-4xl font-bold">Watch History</p>
                    {
                        apiCalled ?
                            Object.entries(sortVideosByDate(watchHistory)).length > 0 ?

                                Object.entries(sortVideosByDate(watchHistory)).map(([date, videos]: any) => (
                                    <div key={date}>
                                        <p className="text-xl font-bold mt-10">{date}</p>
                                        {videos.map((videoId: any) => (
                                            <HistoryVideo key={videoId} videoId={videoId} />
                                        ))}
                                    </div>
                                )) :

                                <div className="mt-20">
                                    <p className="text-lg">History Empty</p>
                                </div>
                            :
                            <div className="flex mt-20 justify-center">
                                <LoadingBar />
                            </div>
                    }
                </div>
                <div className="fixed right-[260px] basis-1/4 mt-28">
                    <div className="border-b w-[230px] mt-3 border-new-gray"></div>
                    <div className="mt-5 w-[200px] h-[35px] flex justify-center items-center rounded-full hover:bg-side-gray-1 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                        <span className="ml-1">Clear watch history</span>
                    </div>
                    <div className="mt-2 w-[200px] h-[35px] flex justify-center items-center rounded-full hover:bg-side-gray-1 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                        </svg>
                        <span className="ml-1">Pause watch history</span>
                    </div>
                </div>

            </div>
        </>
    );
}
