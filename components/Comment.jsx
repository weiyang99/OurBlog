"use client"

import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import CommentCard from './CommentCard'

const Comment = ({ post_id }) => {
    const { data: session } = useSession();

    const [isOpen, setIsOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState([])
    const [addComment, setAddComment] = useState(false);
    const [submitting, setIsSubmitting] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const handleOnclick = () => {
        setAddComment((prev) => !prev);
    }

    const createComment = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`/api/comment/new`, {
                method: "POST",
                body: JSON.stringify({
                    userId: session?.user.id,
                    postId: post_id,
                    comment: comment,
                }),
            });

            if (response.ok) {
                setAddComment((prev) => !prev);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
            setComment('');
        }
    };

    const handleDelete = async (comment) => {
        const hasConfirmed = confirm(
            "Are you sure you want to delete this comment?"
        );

        if (hasConfirmed) {
            try {
                await fetch(`/api/comment/${comment._id.toString()}`, {
                    method: "DELETE",
                });

                const filteredComments = commentList.filter((item) => item._id !== comment._id);

                setCommentList(filteredComments);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        const fetchComments = async () => {
            const response = await fetch(`/api/comment/${post_id}`, {
                method: "GET",
            });
            const data = await response.json();

            setCommentList(data);
        };
        if (post_id) fetchComments();
    }, [submitting]);

    return (
        <>
            <div>
                <button
                    type="button"
                    onClick={openModal}
                    className="sm:text-sm text-xs font-medium text-orange-500 active:text-orange-800 flex_center"
                >
                    <Image
                        src='/assets/icons/comment.svg'
                        width={25}
                        height={25}
                        alt='comment'
                        className='object-contain'
                    />
                    Comments
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-70" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="dialog_panel">
                                    <div
                                        className="flex_center w-full mb-5"
                                    >
                                        <Image
                                            src='/assets/icons/close.svg'
                                            width={40}
                                            height={40}
                                            alt='close'
                                            className='object-contain cursor-pointer'
                                            onClick={closeModal}
                                        />
                                    </div>
                                    <Dialog.Title
                                        as="h3"
                                        className="add_comment"
                                        onClick={handleOnclick}
                                    >
                                        <button type='button'>
                                            Add Comment
                                        </button>
                                    </Dialog.Title>

                                    {(addComment && session?.user) ?
                                        <div className="mt-4">
                                            <form onSubmit={createComment}>
                                                <label>
                                                    <textarea
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                        placeholder='Write your comment here'
                                                        required
                                                        className='form_textarea border border-gray-300'
                                                    />
                                                </label>
                                                <div className="mt-4 flex_center">
                                                    <button
                                                        type='submit'
                                                        disabled={submitting}
                                                        className='px-5 py-1.5 text-sm bg-[#FF5F6D] rounded-full text-white'
                                                    >
                                                        {submitting ? 'Submitting...' : 'Submit'}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>

                                        : (addComment && <div className="mt-4 flex_center text-orange-600 font-semibold">
                                            Sign In to Comment!
                                        </div>)
                                    }

                                    {commentList.map((comment) => <CommentCard key={comment._id} comment={comment} handleDelete={() => handleDelete && handleDelete(comment)} />)}

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default Comment