'use client';

import Posting from '@/components/form/Posting';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PostItem {
    caption: string;
    tag: string;
    postPhoto: string;
}

const EditPosts = () => {
    const { id } = useParams();
    const [post, setPost] = useState<PostItem>();
    const getPostById = async () => {
        try {
            const res = await fetch(`/api/post/${id}`);
            const data = await res.json();

            setPost(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPostById();
    }, [id]);

    const postData = {
        // creatorId: session?.id as Types.ObjectId | string,
        caption: post?.caption,
        tag: post?.tag,
        postPhoto: post?.postPhoto,
    };

    return (
        <div>
            <h1 className="text-2xl my-4 font-bold">Edit posts</h1>
            <Posting post={postData} apiEndPoint={`/api/post/${id}`} />
        </div>
    );
};

export default EditPosts;
