import React, { useMemo } from "react";
import { PostData, Post as PostType } from "../types";
import { FaEllipsisH, FaRegClock,  } from 'react-icons/fa'
import DropdownList from "./DropdownList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removePost } from "../services/post";
import { useAuth } from "../hooks";
import Time from "./Time";

const Post = ({ id, author, title, description, createdAt } : PostType) => {

    const queryClient = useQueryClient();

    const { token } = useAuth();

    const { mutate } = useMutation({
        mutationFn: removePost,
        onSuccess: () => {
            const existing = queryClient.getQueryData<PostData>(['posts', token]);
            const filteredPosts = existing?.data.filter(x => x.id !== id) ?? [];
            const res = { ...existing, data: filteredPosts };
            queryClient.setQueryData(['posts', token], res);
        }
    })

    const items = useMemo(() => {
        return [
            { name: "Remove", onClick: () => mutate({ token, postId: id }) },
        ];
    }, [token, id]);

    return (
        <article className="bg-dark-color text-white p-4 rounded-md">
            <div className="flex items-center">
                <h2 className="text-3xl">{title}</h2>
                <div className="ml-auto">
                    <DropdownList icon={<FaEllipsisH />} items={items} />
                </div>
            </div>
            <div className="flex items-center gap-x-2">
                <FaRegClock className="text-xs" />
                <Time className="text-light-color text-sm" timestamp={createdAt} />
            </div>
            <hr className="w-1/4 mt-2 mb-6"/>
            <p className="text-xl">{description}</p>
        </article>
    )
}

export { Post };
export default Post;