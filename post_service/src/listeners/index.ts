import { receiveMessage } from "../rabbitmq.js"

export const registerListeners = () => {
    receiveMessage("users", (data) => console.log(data))
}