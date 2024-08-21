"use client";

import { Button } from "@/components/ui/button";
import { formatDate } from "@/helpers/formatDate";
import { formatNumber } from "@/helpers/formatNumber";
import axios from "axios";
import { useEffect, useState } from "react";
import SideVideos from "@/components/SideVideos";
import LoadingBar from "@/components/LoadingBar";
import { toast } from "sonner";


export default function VideoDisplay({ params }: any) {

    const videoId = params.videoId;

    const [video, setVideo]: any = useState({});
    const [apiCalled, setApiCalled] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const [newComment, setNewComment] = useState("");

    const [dbComments, setDbComments] = useState<any>([]);

    useEffect(() => {
        axios.get(`/api/video/getSingleVideoInfo/?videoId=${videoId}`)
            .then((res: any) => {
                setVideo(res.data.video);
                setIsSubscribed(res.data.video.isSubscribed);
                setIsSaved(res.data.video.isSaved);
                getComments();
                setApiCalled(true);
                document.title = res.data.video.title;
            })
            .catch((err: any) => console.log(err));

        addHistory();

    }, []);

    const handleVideoEnded = () => {
        axios.post(`/api/video/addViews/?videoId=${videoId}`)
        .then((res: any) => {
            console.log(res);
        })
        .catch(err => console.log(err));
    };

    const addHistory = () => {
        axios.post("/api/video/addToHistory", { videoId: videoId })
            .then((res: any) => {
                console.log(res.data.message);
            })
            .catch(err => console.log(err));
    }


    const handleSubscription = () => {

        !isSubscribed ?

            axios.post("/api/channel/subscribe", { videoId: videoId })
                .then((res: any) => {
                    console.log(res.data.message);
                    setIsSubscribed(true);
                    toast.success("Channel Subscribed");
                })
                .catch((err: any) => console.log(err)) :

            axios.post("/api/channel/unsubscribe", { videoId: videoId })
                .then((res: any) => {
                    console.log(res.data.message);
                    setIsSubscribed(false);
                    toast.success("Subscription Removed");
                })
                .catch((err: any) => console.log(err))

    }

    const handleLike = () => {
        !isLiked ?

            axios.post("/api/video/like", { videoId: videoId })
                .then((res: any) => {
                    console.log(res.data.message);
                    setIsLiked(true);
                    toast.success("Video Liked");
                })
                .catch((err: any) => console.log(err)) :

            axios.post("/api/video/removelike", { videoId: videoId })
                .then((res: any) => {
                    console.log(res.data.message);
                    setIsLiked(false);
                    toast.success("Removed Liked Video");
                })
                .catch((err: any) => console.log(err))

    }

    const handleDislike = () => {
        toast.success("Video Disliked")
    }

    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const shortenDescription = (description: String) => {
        const maxLength = 80;
        if (description.length > maxLength) {
            return description.substring(0, maxLength) + '...';
        } else {
            return description;
        }
    };

    const getComments = () => {
        console.log("GetCommentCalled")
        axios.post("/api/comment/getComments", { videoId: videoId })
            .then(res => {
                console.log(res.data.message);
                setDbComments(res.data.message);
            })
            .catch(err => console.log(err));
    }

    const submitComment = () => {
        axios.post("/api/comment/postComment", { comment: newComment, videoId: videoId })
            .then(res => {
                console.log(res.data.message)
                setNewComment("");
                getComments();
            })
            .catch(err => console.log(err))
    }

    const handleWatchLater = () => {

        isSaved ?
            axios.post("/api/video/removeWatchLater", { videoId: videoId })
                .then(res => {
                    console.log(res.data.message);
                    toast.success("Video removed from watch later");
                    setIsSaved(false);
                })
                .catch(err => console.log(err))
            :
            axios.post("/api/video/addToWatchLater", { videoId: videoId })
                .then(res => {
                    console.log(res.data.message);
                    toast.success("Video Added to watch later");
                    setIsSaved(true);
                })
                .catch(err => console.log(err))
    }


    return (
        <>
            {apiCalled ?
                <div className="flex">
                    <div className="basis-1/2 text-white mt-28 ml-5">
                        <div className="w-[850px] h-[500px] object-cover">
                            <video onEnded={handleVideoEnded} className="rounded-lg" controls>
                                <source src={`/api/video/getSingleVideo/?videoId=${videoId}`} />
                            </video>
                        </div>
                        <p className="text-lg">{video.title}</p>
                        <div className="flex items-center mt-3 w-[850px]">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                <img className="w-full h-full object-cover" src={`/logo/${video.logo.split("\\").pop()}`} alt="logo" />
                            </div>
                            <div className="ml-3 flex-grow">
                                <p className="text-md">{video.channelName}</p>
                                <p className="text-sm">{`${formatNumber(video.subscribers)[0]}${formatNumber(video.subscribers)[1]} subscribers`}</p>
                            </div>
                            <div className="ml-3 flex-shrink-0">
                                <Button className="bg-white text-black hover:bg-gray-300 rounded-full" onClick={handleSubscription}>{isSubscribed ? "Subscribed" : "Subscribe"}</Button>
                            </div>
                            <div className="ml-3 flex-shrink-0">
                                <Button className="flex items-center bg-white text-black hover:bg-gray-300 rounded-full" onClick={handleLike}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                                    </svg>
                                    {`${formatNumber(video.likes)[0]}${formatNumber(video.likes)[1]}`}
                                </Button>
                            </div>
                            <div className="ml-3 flex-shrink-0">
                                <Button className="flex items-center bg-white text-black hover:bg-gray-300 rounded-full" onClick={handleDislike}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
                                    </svg>
                                </Button>
                            </div>
                            <div className="ml-3 flex-shrink-0">
                                <Button className="flex items-center bg-white text-black hover:bg-gray-300 rounded-full" onClick={handleWatchLater}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                        <div className="w-[850px] rounded-lg bg-new-gray mt-5">
                            <div className="flex">
                                <p className="w-[150px] ml-2 mt-2">{formatNumber(video.views)} views</p>
                                <p className="mt-2">{formatDate(video.createdAt)}</p>
                            </div>
                            <div className="ml-2 mt-2 mb-2">
                                <p>
                                    Description:<br />
                                    {showFullDescription ? (
                                        <span>{video.description}</span>
                                    ) : (
                                        <span>{shortenDescription(video.description)}</span>
                                    )}
                                    <span className="cursor-pointer" onClick={toggleDescription}>{showFullDescription ? '  Show less' : ' Show more'}</span>
                                </p>
                            </div>
                        </div>
                        <div className="w-[850px] mt-5">
                            <h1 className="font-bold text-lg">{dbComments.length} Comments</h1>
                            <div className="flex flex-col items-end">
                                <div className="flex h-12 items-center">
                                    <div className="w-12 h-12 rounded-full overflow-hidden mt-5">
                                        <img className="w-full h-full object-cover" src={`/logo/${video.logo.split("\\").pop()}`} alt="logo" />
                                    </div>
                                    <input type="text" placeholder="Add a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} className="bg-my-bg text-white w-[800px] ml-2 border-b-2 focus:outline-none" />
                                </div>
                                <div className="flex">
                                    <Button variant={"ghost"} onClick={() => setNewComment("")} className="hover:bg-new-gray hover:text-white mr-3 rounded-full">
                                        Cancel
                                    </Button>
                                    <Button onClick={submitComment} className={`${newComment === "" ? "bg-new-gray cursor-not-allowed" : "bg-green-500 hover:bg-green-700"} rounded-full`} disabled={newComment === ""}>
                                        Submit
                                    </Button>
                                </div>
                            </div>
                            {
                                dbComments.map((comment: any) => {
                                    return (
                                        <div key={comment._id} className="flex items-center mt-5">
                                            <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                                                <img className="w-full h-full object-cover" src={`/logo/${comment.logo.split("\\").pop()}`} alt="logo" />
                                            </div>
                                            <div>
                                                <p className="text-sm">{comment.username}<span className="text-new-gray text-sm ml-2">{formatDate(comment.createdAt)}</span></p>
                                                <p className="text-sm">{comment.content}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                    <div className="basis-1/4 mt-20 z-5">
                        <SideVideos videoId={videoId} />
                    </div>

                </div>

                :
                <div className="flex h-screen items-center justify-center">
                    <LoadingBar />
                </div>
            }
        </>
    )
}