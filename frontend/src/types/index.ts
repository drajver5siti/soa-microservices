export type User = {
    id: number
}

export type AddPost = {
    author: number,
    title: string,
    description: string
}

export type Post = {
    id: number,
    author: number,
    title: string,
    description: string,
    updatedAt: string,
    createdAt: string
}

export type PostData = {
    page: number,
    perPage: number,
    data: Post[]
}