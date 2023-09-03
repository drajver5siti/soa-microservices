import { receiveMessage } from "../rabbitmq.js"
import { handlePostMessage } from "./posts.js";
import { handleUserMessage } from "./users.js"

export const registerListeners = () => {
    receiveMessage("users", handleUserMessage);
    receiveMessage("posts", handlePostMessage)
}
