import { formatDate } from "@/helpers/formatDate";
import { formatNumber } from "@/helpers/formatNumber";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react"

export default function VideoCard({ video }: any) {

    const router = useRouter();

    const handleClick = () => {
        router.push(`/${video._id}`);
    }

    return <>
        <div className="ml-5">
            <div key={video._id} className="md:w-[300px] w-[240px] ml-10 cursor-pointer mb-10">
                <div className="md:w-[300px] w-[240px]" style={{ position: 'relative' }} onClick={handleClick}>
                    <img className="rounded-lg md:w-[300px] md:h-[200px] w-[240px] h-[150px]" src={`/thumbnails/${video.thumbnail.split("\\").pop()}`} alt="Thumbnail" />
                    <div className="rounded-lg" style={{ position: 'absolute', bottom: 0, right: 0, background: 'rgba(0, 0, 0, 0.5)', color: '#fff', padding: '4px 8px' }}>
                        {video.duration}
                    </div>
                </div>
                <div className="flex mt-3">
                    <div className="rounded">
                        <img className="rounded-full md:w-[40px] md:h-[40px] w-[36px] h-[30px]" src={`/logo/${video.logo.split("\\").pop()}`} alt="logo" />
                    </div>
                    <div className="ml-3">
                        <h2>{video.title}</h2>
                        <Link href="#" className="hover:text-grey-600">
                            <p className="truncate text-overflow: ellipsis">{video.channelName}</p>
                        </Link>
                        <div className="flex" onClick={handleClick}>
                            <p>{`${formatNumber(video.views)[0]}${formatNumber(video.views)[1]} 👁`}</p>
                            <p style={{ marginLeft: "4.5rem" }}>{formatDate(video.createdAt)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}