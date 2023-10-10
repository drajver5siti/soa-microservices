import { receiveMessage } from "../rabbitmq.js"
import { sendMessage } from "../websocket.js"

export const registerListeners = () => {
    receiveMessage("chats", (event) => {
        if(event.type === "chat_created") {
            return sendMessage(event.chat.participants, event);
        }
    })
}