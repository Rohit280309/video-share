"use client";

import { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function UploadVideo() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [file, setFile] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        const formData: any = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('file', file);
        formData.append('thumbnail', thumbnail);

        try {
            const response = await axios.post('/api/video/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast.success("Video Uploaded")
            setTitle('');
            setDescription('');
            setCategory('');
            
        } catch (error: any) {
            setErrorMessage(error.response.data.error);
        }
    };

    return (
        <div className='w-half flex flex-col items-center justify-center min-h-screen dark text-white'>
            <h1>Upload Video</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className='mt-3'>
                        <label>Title:</label>
                        <Input className='shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className='mt-3'>
                        <label>Description:</label>
                        <Textarea className='shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline' value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className='mt-3'>
                        <label>Category:</label>
                        <Input className='shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline' type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                    </div>
                    <div className='mt-3'>
                        <label>Choose Video:</label>
                        <Input className='shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline' type="file" accept="video/*" onChange={(e: any) => setFile(e.target.files[0])} />
                    </div>
                    <div className='mt-3'>
                        <label>Choose Thumbnail:</label>
                        <Input className='shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline' type="file" accept="image/*" onChange={(e: any) => setThumbnail(e.target.files[0])} />
                    </div>
                    <Button className='bg-green-500 hover:bg-green-700 text-white mt-5 hover:cursor-pointer' type="submit">Upload</Button>
                </form>
            </div>
        </div>
    );
}