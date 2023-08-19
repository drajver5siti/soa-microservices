import React from "react";
import { useQuery } from "@tanstack/react-query";
import { loadPosts } from "../services/post";
import { useAuth } from "../hooks";
import Post from "./Post";
import AddPostInput from "./AddPostInput";

const Home = () => {
    const { token } = useAuth();

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['posts', token],
        queryFn: () => loadPosts(token),
        select: (data) => data.data
    })

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(isError) {
        console.log(error)
        return <div>Error</div>
    }

    return (
        <main>
            <section className="w-2/4 mx-auto flex flex-col gap-y-4">
                <AddPostInput />
                {
                    data.map(post => <Post key={post.id} {...post} />)
                }
            </section>
        </main>
    )
}

export { Home };