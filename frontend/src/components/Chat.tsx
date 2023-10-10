import React, { useEffect, useRef, useState } from "react"
import { Chat as ChatType } from "../types"
import { FaTimes } from "react-icons/fa"
import Message from "./Message"
import Messages from "./Messages"

type Props = {
    chat: ChatType,
    customChatTitle: string | null,
    onSendMessage: (message: string) => void,
    onCloseChat: () => void
}

const Chat = ({ chat, onSendMessage, onCloseChat, customChatTitle = null }: Props) => {
    const [message, setMessage] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.code === "Enter") {
            setMessage("");
            onSendMessage(message)
        }
    }

    return (
        <div className="fixed bottom-10 right-10 bg-light-color w-4/12 h-3/6 flex flex-col">
            <div className="bg-dark-color px-2 py-1 border flex">
                <p className="text-light-color">{customChatTitle ?? chat.title}</p>
                <button className="p-0 m-0 text-light-color ml-auto" onClick={onCloseChat}>
                    <FaTimes/>
                </button>
            </div>
            <Messages messages={chat.messages}/>
            <input 
                type="text" 
                value={message}
                className="w-full p-2 border focus-visible: outline-none caret-white bg-dark-color text-white"
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}

export { Chat };
export default Chat;