import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChatConfig } from "@/components/chat/ChatConfig";
import { ChatPreview } from "@/components/chat/ChatPreview";

export interface ChatMessage {
  id: string;
  sender: {
    avatar: string;
    nickname: string;
  };
  content: string;
  timestamp: string;
  isSelf: boolean;
}

export interface ChatConfig {
  self: {
    avatar: string;
    nickname: string;
  };
  other: {
    avatar: string;
    nickname: string;
  };
  messages: ChatMessage[];
}

export function ChatGenerator() {
  const [chatConfig, setChatConfig] = useState<ChatConfig>({
    self: {
      avatar: "",
      nickname: "我",
    },
    other: {
      avatar: "",
      nickname: "对方",
    },
    messages: [],
  });

  return (
    <div className="container mx-auto p-4 h-screen">
      <div className="grid grid-cols-2 gap-4 h-full">
        {/* 左侧配置面板 */}
        <Card className="p-4 overflow-y-auto">
          <ChatConfig config={chatConfig} onConfigChange={setChatConfig} />
        </Card>
        
        {/* 右侧预览面板 */}
        <Card className="p-4 overflow-y-auto bg-gray-50">
          <ChatPreview config={chatConfig} />
        </Card>
      </div>
    </div>
  );
} 
