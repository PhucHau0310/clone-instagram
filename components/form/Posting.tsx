'use client';

import { useForm } from 'react-hook-form';
import Image from 'next/image';
import addPhoto from '../../public/assets/icons/add-photo.svg';
import { useRouter } from 'next/navigation';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

const Posting = ({
    post,
    apiEndPoint,
}: {
    post: {
        // creatorId: Types.ObjectId | string;
        caption?: string;
        tag?: string;
        postPhoto?: string;
    };
    apiEndPoint: string;
}) => {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({ defaultValues: post });

    const handlePublish = async (data: {
        // creatorId: Types.ObjectId | string;
        caption?: string;
        tag?: string;
        postPhoto?: string;
    }) => {
        try {
            const postForm = new FormData();

            // postForm.append('creatorId', data.creatorId as string);
            postForm.append('caption', data.caption as string);
            postForm.append('tag', data.tag as string);
            postForm.append('postPhoto', (data.postPhoto as string)[0]);

            const res = await fetch(apiEndPoint, {
                method: 'POST',
                body: postForm,
            });

            if (res.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(handlePublish)}>
                <label
                    htmlFor="photo"
                    className="w-2/5 flex items-center gap-4 cursor-pointer my-6"
                >
                    {watch('postPhoto') ? (
                        <Image
                            src={watch('postPhoto') as string | StaticImport}
                            alt="image-post"
                            width={100}
                            height={100}
                        />
                    ) : (
                        <Image
                            src={addPhoto}
                            alt="add-photo"
                            width={80}
                            height={80}
                        />
                    )}
                    <p className="">Upload a photo</p>
                </label>
                <input
                    {...register('postPhoto', {
                        validate: (value) => {
                            if (
                                value === 'null' ||
                                (Array.isArray(value) && value.length === 0) ||
                                value === 'undefined'
                            ) {
                                return 'A photo is required!';
                            }
                            return true;
                        },
                    })}
                    id="photo"
                    placeholder="first name"
                    type="file"
                    style={{ display: 'none' }}
                />
                {errors.postPhoto && (
                    <p className="text-red-500">{errors.postPhoto.message}</p>
                )}

                <div className="flex flex-col justify-center gap-4">
                    <label htmlFor="caption" className="text-lg font-medium">
                        Caption
                    </label>
                    <textarea
                        {...register('caption', {
                            required: 'Caption is required',
                            validate: (value) => {
                                if ((value as string).length < 3) {
                                    return 'Caption must be more than 2 characters';
                                }
                            },
                        })}
                        id="caption"
                        placeholder={`${
                            post.caption || "What's on your mind?"
                        } `}
                        className="w-4/5 bg-[#323334] px-3 py-3 rounded-lg"
                        rows={5}
                    />
                    {errors.caption && (
                        <p className="text-red-500">{errors.caption.message}</p>
                    )}
                </div>

                <div className="flex flex-col justify-center gap-4 my-5">
                    <label htmlFor="tag" className="text-lg font-medium">
                        Tag
                    </label>
                    <input
                        {...register('tag', {
                            required: 'Tag is required',
                        })}
                        type="text"
                        id="tag"
                        placeholder={`${post.tag || '#tag'} `}
                        className="w-4/5 bg-[#323334] px-3 py-3 rounded-lg"
                    />

                    {errors.tag && (
                        <p className="text-red-500">{errors.tag.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="text-lg font-semibold my-6 mb-10 rounded-lg px-4 py-4 w-4/5 bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-200"
                >
                    Publish
                </button>
            </form>
        </div>
    );
};

export default Posting;
