import React from "react";
import { Message as MessageType } from "../types";
import { colorHash } from "../helpers";

type Props = {
    message: MessageType
}

const Message = ({ message }: Props) => {
	const { hex } = colorHash("" + message.userId + "jeajg,sajdj");

    return (
        <div className="flex relative gap-x-2">
            <div style={{ backgroundColor: hex }} className="rounded-full w-5 h-5 top-0 left-0 shrink-0"></div>
            <p className="-mt-1">
                {message.content}
            </p>
        </div>
    )
}

export { Message };
export default Message;