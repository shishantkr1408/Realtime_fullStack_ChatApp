import { X, Trash2 } from "lucide-react";
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore';

const ChatHeader = () => {
    const {selectedUser,setSelectedUser,clearAIChat}=useChatStore();
    const {onlineUsers}=useAuthStore();
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser?.profilePic || "/avatar.png"} alt={selectedUser?.fullName} />
            </div>
          </div>

          <div>
            <h3 className="font-medium">
              {selectedUser?.email === "chattyai@bot.com"
                ? "🤖 Chatty AI"
                : selectedUser?.fullName}
            </h3>

            <p className="text-sm text-base-content/70">
              {selectedUser?.email === "chattyai@bot.com"
                ? "Always Available"
                : onlineUsers.includes(selectedUser?._id)
                ? "Online"
                : "Offline"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selectedUser?.email === "chattyai@bot.com" && (
            <button
              onClick={clearAIChat}
              className="btn btn-sm btn-error"
            >
              <Trash2 size={16} />
              Clear Chat
            </button>
          )}
          <button onClick={() => setSelectedUser(null)}>
            <X />
          </button>
       </div>
         </div>
    </div>
  )
}

export default ChatHeader