import { ChatConfig as ChatConfigType } from "@/pages/ChatGenerator";
import { cn } from "@/lib/utils";

interface ChatPreviewProps {
  config: ChatConfigType;
}

export function ChatPreview({ config }: ChatPreviewProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">聊天预览</h2>
      <div className="space-y-4">
        {config.messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex items-start gap-2",
              message.isSelf ? "flex-row-reverse" : "flex-row"
            )}
          >
            {/* 头像 */}
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={message.sender.avatar || "/default-avatar.png"}
                alt={message.sender.nickname}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 消息内容 */}
            <div
              className={cn(
                "max-w-[70%] rounded-lg p-3",
                message.isSelf
                  ? "bg-green-500 text-white ml-2"
                  : "bg-white border border-gray-200 mr-2"
              )}
            >
              <div className="text-sm mb-1">{message.sender.nickname}</div>
              <div className="whitespace-pre-wrap break-words">
                {message.content}
              </div>
              <div
                className={cn(
                  "text-xs mt-1",
                  message.isSelf ? "text-green-100" : "text-gray-500"
                )}
              >
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
