"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import LoadingBar from "./LoadingBar";

export default function DisplayVideo() {
    
    const [videos, setVideos] = useState([]);
    const [apiCalled, setApiCalled] = useState(false);

    useEffect(() => {
        axios.get("/api/video/getAllVideos")
        .then((res: any) => {
            setVideos(res.data.videos);
            setApiCalled(true);
        })
        .catch(err => console.log(err));
    }, []);
    
    return (
        <div className="text-white mt-10">
            
            {apiCalled ? (
                videos.length > 0 ? (
                    <div className="flex flex-wrap">
                        {videos.map((video: any) => (
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
    );
}
