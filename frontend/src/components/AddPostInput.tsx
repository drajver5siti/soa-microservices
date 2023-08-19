import React, { useState } from "react";
import { PostData } from "../types";
import Modal from "./Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPost } from "../services/post";
import { useAuth, useUser } from "../hooks";

const AddPostInput = () => {
    const queryClient = useQueryClient();

    const { token } = useAuth();
    const user = useUser();

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const { isLoading, mutate } = useMutation({
        mutationFn: addPost,
        onSuccess: (newPost) => {
            setOpen(false);
            const existing = queryClient.getQueryData<PostData>(['posts', token]);
            const existingPosts = existing?.data ?? [];
            const res = { ...existing, data: [newPost, ...existingPosts]};
            queryClient.setQueryData(['posts', token], res)
        }
    })

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = () => {
        mutate({ token, author: user.id, title, description });
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="
                    w-max
                    px-4 
                    py-2 
                    rounded-md 
                    bg-dark-color 
                    text-white
                    flex
                    justify-center
                    items-center
                    gap-x-2
                "
            >
                <span className="text-3xl">+</span>
                <span className="text-xl">Add something</span>
            </button>
            {
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <form className="text-white">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            className="
                                w-full 
                                p-4
                                text-3xl
                                focus-visible: outline-none 
                                rounded-md 
                                caret-white 
                                text-white 
                                bg-dark-color border border-gray-700 focus:border-light-color"
                        />
                        <br />
                        <br />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            rows={15}
                            className="
                                w-full
                                p-4
                                text-xl
                                resize-none
                                bg-dark-color border border-gray-700 focus:border-light-color
                            "
                        >
                        </textarea>
                    </form>
                    <div className="flex justify-end gap-x-4">
                        <Modal.CancelButton onClick={handleClose} loading={isLoading} />
                        <Modal.SubmitButton onClick={handleSubmit} loading={isLoading} />
                    </div>
                </Modal>
            }
        </>
    )
}

export { AddPostInput };
export default AddPostInput;