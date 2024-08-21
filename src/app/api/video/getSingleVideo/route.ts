import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import Video from '@/models/Video';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const videoId: any = searchParams.get('videoId');

        const video = await Video.findById(videoId);

        const videoFilePath = video.filePath;

        if (!fs.existsSync(videoFilePath)) {
            return NextResponse.json({ error: 'Video not found' }, { status: 404 });
        }

        const stat = fs.statSync(videoFilePath);

        const headers: any = {
            'Content-Type': 'video/mp4',
        };

        const range = request.headers.get('Range');
        if (range) {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
            const chunksize = (end - start) + 1;

            headers['Content-Range'] = `bytes ${start}-${end}/${stat.size}`;
            headers['Accept-Ranges'] = 'bytes';
            headers['Content-Length'] = chunksize;
            headers['Content-Disposition'] = `inline; filename="${path.basename(videoFilePath)}"`;

            const videoStream: any = fs.createReadStream(videoFilePath, { start, end });

            return new NextResponse(videoStream, {
                status: 206,
                headers,
            });
        } else {
            headers['Content-Length'] = stat.size;

            const videoStream: any = fs.createReadStream(videoFilePath);

            return new NextResponse(videoStream, {
                status: 200,
                headers,
            });
        }
    } catch (error) {
        console.error('Error streaming video:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
