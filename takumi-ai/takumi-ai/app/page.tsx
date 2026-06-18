"use client";

type Message = {
  role:"user" | "ai";
  content: string;
};

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

function handleSend() {
  if (message.trim() === "") return;

  let aiReply = "まだ勉強中です";

  if (message === "こんにちは") {
    aiReply = "こんにちは！";
  }

  setMessages([
    ...messages,
{role :"user", content:message},
{role :"ai",content:aiReply}
  ]);

  setMessage("");


  }

  return (
    <main className="bg-black text-white h-screen flex flex-col items-center p-6">
      <h1>Takumi AI</h1>

      <div className="bg-gray-800 h-96 border border-gray-700 rounded-lg w-full max-w-3xl overflow-y-auto p-4">
        {messages.length === 0 && (
          <p>質問を入力してください</p>
        )}

    {messages.map((item, index) => (
  <div
    key={index}
    className={
      item.role === "user"
        ? "flex justify-end mb-2"
        : "flex justify-start mb-2"
    }
  >
    <span
    className={
      item.role ==="user"
      ?"bg-blue-500 px-3 py-2 rounded-lg"
      :"bg-gray-600 px-3 py-2 rounded-lg"
    }
    >
    {item.content}
    </span>
  </div>
))}


      </div>

      <div className="flex w-full max-w-3xl mt-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing) {
              handleSend();
            }
          }}
          className="border border-white flex-1"
          placeholder="メッセージを入力..."
        />

        <button
          onClick={handleSend}
          className="bg-emerald-600 px-4 rounded-lg"
        >
          送信
        </button>
      </div>
    </main>
  );
}