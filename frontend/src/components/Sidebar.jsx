import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Add safety check for users being undefined or null
  const filteredUsers = showOnlineOnly
    ? (users || []).filter((user) => onlineUsers?.includes(user._id))
    : (users || []);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200 bg-base-100">
      {/* Header Section */}
      <div className="border-b border-base-300 w-full p-5 bg-base-200/30">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Users className="size-5 text-primary" />
          </div>
          <span className="font-semibold hidden lg:block text-base">Contacts</span>
        </div>
        
        {/* Online filter toggle */}
        <div className="mt-4 hidden lg:flex items-center justify-between">
          <label className="cursor-pointer flex items-center gap-2 group">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm checkbox-primary"
            />
            <span className="text-sm font-medium group-hover:text-primary transition-colors">
              Show online only
            </span>
          </label>
          <span className="text-xs font-medium px-2 py-1 bg-green-500/10 text-green-600 rounded-full">
            {(onlineUsers?.length || 0) - 1}
          </span>
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto w-full py-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-200 transition-all duration-200
              border-l-4 border-transparent
              ${selectedUser?._id === user._id 
                ? "bg-base-200 border-l-primary shadow-sm" 
                : "hover:border-l-base-300"
              }
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <div className="avatar">
                <div className="size-12 rounded-full ring-2 ring-base-300 ring-offset-2 ring-offset-base-100">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.name}
                    className="object-cover"
                  />
                </div>
              </div>
              {onlineUsers?.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3.5 bg-green-500 rounded-full ring-2 ring-base-100 animate-pulse" />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="font-semibold truncate text-sm">{user.fullName}</div>
              <div className={`text-xs flex items-center gap-1.5 mt-0.5 ${
                onlineUsers?.includes(user._id) ? "text-green-600" : "text-base-content/60"
              }`}>
                <span className={`size-1.5 rounded-full ${
                  onlineUsers?.includes(user._id) ? "bg-green-500" : "bg-base-content/40"
                }`} />
                {onlineUsers?.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
        
        {filteredUsers.length === 0 && (
          <div className="text-center text-base-content/50 py-8 px-4">
            <Users className="size-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm font-medium">No online users</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;