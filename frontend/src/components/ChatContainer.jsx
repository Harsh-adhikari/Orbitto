import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/utils";
import { useRef } from "react";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore()
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if(messageEndRef.current && messages)
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  },[messages]); // if there is msg then it call scroll smooth function 

  // when the selectedUser changes then getMessages will load the user msg
  //selectedUser?._id → The ? means “check safely” (won’t crash if selectedUser is null).
  if (isMessagesLoading) {
    // if msg loading is true it will render these header skeleton and msginput
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
       {messages.map((message) => (
        <div 
        key={message._id} className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`} ref={messageEndRef}> 
        <div className=" chat-image avatar">
          <div className="size-10 rounded-full border">
            <img src={message.senderId === authUser._id ? authUser.profilePic || "/avatar.png": selectedUser.profilePic || "/avatar.png"} alt="profile pic"/>
          </div>
        </div>
        <div className="chat-header mb-1">
            <time className="text-xs opacity-50 ml-1">{formatMessageTime(message.createdAt)}</time>
        </div>
        <div className="chat-bubble flex">
         {/* If there is img or msg it will show that */}
         {
          message.image && (
            <img
            src={message.image}
            alt="Attachment"
            className="sm:max-w-[200px] rounded-md mb-2"
            />
          )}
          {message.text && <p>{message.text}</p>}
        </div>
        </div>
       ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
