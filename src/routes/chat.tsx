import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Bot, Send, User } from "lucide-react";
import { Button } from "@base-ui-components/react/button";

export const Route = createFileRoute("/chat")({
  component: ChatApp,
});

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

async function sendMessage(messages: Array<Message>): Promise<string> {
  // 実際のAPI呼び出しの代わりに、モックレスポンスを返す
  // 本番環境では、OpenAI APIや他のAIサービスを呼び出す
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const lastMessage = messages[messages.length - 1]?.content || "";
  return `これは "${lastMessage}" に対するモックレスポンスです。実際のAI APIを統合するには、サーバー関数を作成してAPIキーを安全に管理してください。`;
}

function ChatApp() {
  const [messages, setMessages] = useState<Array<Message>>([
    {
      id: "1",
      role: "assistant",
      content: "こんにちは！何かお手伝いできることはありますか？",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: (response) => {
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    },
  });

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    mutation.mutate([...messages, userMessage]);
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-cyan-600 to-blue-600 p-6">
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Bot className="w-8 h-8" />
              Chat AI
            </h1>
            <p className="text-cyan-100 mt-2">
              TanStack StartとBase UIで構築されたAIチャットアプリ
            </p>
          </div>

          {/* Messages */}
          <div className="h-[600px] overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center shrink-0">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === "user"
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-700 text-gray-100"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <span className="text-xs opacity-70 mt-2 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                {message.role === "user" && (
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            ))}
            {mutation.isPending && (
              <div className="flex gap-4 justify-start">
                <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce">
                    </div>
                    <div
                      className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    >
                    </div>
                    <div
                      className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    >
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-slate-700 p-4 bg-slate-800/50">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="メッセージを入力..."
                className="flex-1 min-h-[60px] bg-slate-700 text-white border border-slate-600 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
                disabled={mutation.isPending}
              />
              <Button
                type="button"
                onClick={handleSend}
                disabled={!input.trim() || mutation.isPending}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                送信
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
