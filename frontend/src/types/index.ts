export type User = {
    id: number,
    username: string,
    createdAt: string
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

export type Notification = {
    id: number,
    type: string,
    message: string,
    updatedAt: string,
    createdAt: string,
    status: string
}

export type NotificationData = {
    page: number,
    perPage: number
    data: Notification[]
}

export type Chat = {
    _id: string,
    title: string | null,
    participants: [
        {
            id: number
        }
    ],
    messages: Message[],
    type: "single_chat" | "group_chat"
}

export type Message = {
    _id: string,
    content: string,
    userId: number,
    createdAt: string
}