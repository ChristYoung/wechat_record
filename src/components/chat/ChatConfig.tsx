import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChatConfig as ChatConfigType, ChatMessage } from "@/pages/ChatGenerator";
import { format } from "date-fns";

interface ChatConfigProps {
  config: ChatConfigType;
  onConfigChange: (config: ChatConfigType) => void;
}

export function ChatConfig({ config, onConfigChange }: ChatConfigProps) {
  const [newMessage, setNewMessage] = useState("");
  const [isSelf, setIsSelf] = useState(true);

  const handleAddMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: isSelf ? config.self : config.other,
      content: newMessage.trim(),
      timestamp: format(new Date(), "yyyy-MM-dd HH:mm"),
      isSelf,
    };

    onConfigChange({
      ...config,
      messages: [...config.messages, message],
    });

    setNewMessage("");
  };

  const handleConfigChange = (
    field: "self" | "other",
    key: "avatar" | "nickname",
    value: string
  ) => {
    onConfigChange({
      ...config,
      [field]: {
        ...config[field],
        [key]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">聊天配置</h2>
        
        {/* 发送方配置 */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">发送方设置</h3>
          <div className="grid gap-2">
            <div>
              <Label htmlFor="self-avatar">头像 URL</Label>
              <Input
                id="self-avatar"
                value={config.self.avatar}
                onChange={(e) => handleConfigChange("self", "avatar", e.target.value)}
                placeholder="输入头像图片URL"
              />
            </div>
            <div>
              <Label htmlFor="self-nickname">昵称</Label>
              <Input
                id="self-nickname"
                value={config.self.nickname}
                onChange={(e) => handleConfigChange("self", "nickname", e.target.value)}
                placeholder="输入昵称"
              />
            </div>
          </div>
        </div>

        {/* 接收方配置 */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">接收方设置</h3>
          <div className="grid gap-2">
            <div>
              <Label htmlFor="other-avatar">头像 URL</Label>
              <Input
                id="other-avatar"
                value={config.other.avatar}
                onChange={(e) => handleConfigChange("other", "avatar", e.target.value)}
                placeholder="输入头像图片URL"
              />
            </div>
            <div>
              <Label htmlFor="other-nickname">昵称</Label>
              <Input
                id="other-nickname"
                value={config.other.nickname}
                onChange={(e) => handleConfigChange("other", "nickname", e.target.value)}
                placeholder="输入昵称"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 消息输入区域 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">添加消息</h2>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Button
              variant={isSelf ? "default" : "outline"}
              onClick={() => setIsSelf(true)}
            >
              发送方
            </Button>
            <Button
              variant={!isSelf ? "default" : "outline"}
              onClick={() => setIsSelf(false)}
            >
              接收方
            </Button>
          </div>
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="输入消息内容"
            className="min-h-[100px]"
          />
          <Button onClick={handleAddMessage} className="w-full">
            添加消息
          </Button>
        </div>
      </div>
    </div>
  );
} 
