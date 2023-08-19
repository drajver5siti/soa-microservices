import { API_PREFIX, calculateHeaders } from ".."
import { AddPost, Post, PostData } from "../../types";

export const loadPosts = async (token: string): Promise<PostData> => {
    try {
        const response = await fetch(`${API_PREFIX}/posts/`, {
            headers: calculateHeaders(token)
        })

        const data = await response.json();

        if(!response.ok) {
            throw data;
        }

        return data;
    } catch(err) {
        throw err;
    }
}

export const addPost = async ({ token, author, description, title }: { token: string } & AddPost): Promise<Post> => {
    try {
        const response = await fetch(`${API_PREFIX}/posts/`, {
            headers: calculateHeaders(token),
            method: 'post',
            body: JSON.stringify({ author, description, title })
        })

        const res = await response.json();

        if(!response.ok) {
            throw res;
        }

        return res;
    } catch(err) {
        throw err;
    }
}

export const removePost = async ({ token, postId }: { token: string, postId: number }): Promise<void> => {
    try {
        const response = await fetch(`${API_PREFIX}/posts/${postId}`, {
            headers: calculateHeaders(token),
            method: "delete",
        })

        const res = await response.json();

        if(!response.ok) {
            throw res;
        } 
    } catch(err) {
        throw err;
    }
}