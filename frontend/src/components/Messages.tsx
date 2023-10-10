import React, { useEffect, useRef } from "react"
import { Message as MessageType } from "../types"
import Message from "./Message"

type Props = {
    messages: MessageType[]
}

const Messages = ({ messages }: Props) => {
    const messagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(messagesRef.current) {
            messagesRef.current.scrollIntoView({ behavior: 'instant' })
        }
    }, [messages.length]);

    return (
        <div className="bg-light-color flex-grow p-2 text-lg overflow-auto flex flex-col gap-y-1">
            {messages.map((message) => <Message key={message._id} message={message} />)}
            <div ref={messagesRef}></div>
        </div>
    )
}

export { Messages };
export default Messages;