import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    // This is a header of the chat container
    <div className="p-4 border-b border-base-300 bg-base-100 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-11 rounded-full relative ring-2 ring-base-300 ring-offset-2 ring-offset-base-100">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                className="object-cover"
              />
              {onlineUsers.includes(selectedUser._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-base-100 animate-pulse" />
              )}
            </div>
          </div>
          
          {/* User info */}
          <div>
            <h3 className="font-semibold text-base">{selectedUser.fullName}</h3>
            <p className={`text-xs font-medium flex items-center gap-1.5 mt-0.5 ${
              onlineUsers.includes(selectedUser._id)
                ? "text-green-600"
                : "text-base-content/60"
            }`}>
              <span className={`size-1.5 rounded-full ${
                onlineUsers.includes(selectedUser._id) ? "bg-green-500" : "bg-base-content/40"
              }`} />
              {onlineUsers.includes(selectedUser._id)
                ? "Online"
                : `Last seen ${new Date(selectedUser.lastSeen).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}`}
            </p>
          </div>
        </div>
        
        {/* Close button */}
        <button 
          onClick={() => setSelectedUser(null)}
          className="btn btn-ghost btn-sm btn-circle hover:bg-base-300 transition-colors"
        >
          <X className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;