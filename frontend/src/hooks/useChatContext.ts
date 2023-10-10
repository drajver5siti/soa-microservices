import React from "react";
import { ChatContext } from "../contexts/chat";

export const useChatContext = () => React.useContext(ChatContext);