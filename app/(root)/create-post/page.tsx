'use client';

import Posting from '@/components/form/Posting';
import { Types } from 'mongoose';
import { useSession } from 'next-auth/react';

const CreatePost = () => {
    const { data: session } = useSession();

    const postData = {
        // creatorId: session?.id as Types.ObjectId | string,
        caption: '',
        tag: '',
        postPhoto: '',
    };
    return (
        <div>
            <Posting post={postData} apiEndPoint={'/api/post/new'} />
        </div>
    );
};

export default CreatePost;
