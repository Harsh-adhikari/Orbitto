import { useEffect, useState, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const [isTyping, setIsTyping] = useState(false);
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser, socket } = useAuthStore();
  const messageEndRef = useRef(null);

  // Typing Indicator
  useEffect(() => {
    if (!socket || !selectedUser?._id) return;

    const handleTyping = (senderId) => {
      if (senderId === selectedUser._id) setIsTyping(true);
    };

    const handleStopTyping = (senderId) => {
      if (senderId === selectedUser._id) setIsTyping(false);
    };

    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
    };
  }, [socket, selectedUser]);

  // Load messages on user change
  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }

    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  // Auto scroll
  useEffect(() => {
    if (messageEndRef.current && messages)
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-base-100">
      <ChatHeader />
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-200/20">
        {messages.map((message) => (
          <>
            <div
              key={message._id}
              className={`chat ${
                message.senderId === authUser._id ? "chat-end" : "chat-start"
              }`}
              ref={messageEndRef}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border-2 border-base-300 shadow-sm">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="chat-header mb-1.5 flex items-center gap-2 px-1">
                <time className="text-xs opacity-60 font-medium">
                  {formatMessageTime(message.createdAt)}
                </time>
                {message.senderId === authUser._id && (
                  <span className={`text-xs ${message.read ? 'text-blue-500' : 'opacity-50'}`}>
                    {message.read ? "✓✓" : "✓"}
                  </span>
                )}
              </div>
              
              <div className={`chat-bubble flex flex-col gap-2 shadow-sm ${
                message.senderId === authUser._id 
                  ? "chat-bubble-primary" 
                  : "bg-base-300"
              }`}>
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  />
                )}
                {message.text && <p className="leading-relaxed">{message.text}</p>}
              </div>
            </div>
          </>
        ))}
      </div>

      {/* Typing Indicator */}
      {isTyping && (
        <div className="px-6 py-3 bg-base-100 border-t border-base-300">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <span className="size-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="size-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="size-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-sm text-base-content/70 font-medium">
              {selectedUser.fullName} is typing
            </span>
          </div>
        </div>
      )}

      <MessageInput />
    </div>
  );
};

export default ChatContainer;