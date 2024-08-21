"use client";

import LoadingBar from "@/components/LoadingBar";
import VideoCard from "@/components/VideoCard";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Subscriptions() {

    const [data, setData] = useState<any>([]);
    const [apiCalled, setApiCalled] = useState(false);

    useEffect(() => {
        axios.get("/api/user/getSubscribedDetails")
            .then(res => {
                console.log(res.data.message);
                setData(res.data.message);
                setApiCalled(true);
            })
            .catch(err => console.log(err));
    }, [])


    return (
        <>
            <div className="text-white mt-28">
                {apiCalled ? (
                    data.length > 0 ? (
                        <div className="flex flex-wrap">
                            {data.map((video: any) => (
                                <VideoCard key={video._id} video={video} />
                            ))}
                        </div>

                    ) : (
                        <h2>No videos to display</h2>
                    )
                ) : (
                    <div className="flex items-center justify-center">
                        <LoadingBar />
                    </div>
                )}
            </div>
        </>
    )
}