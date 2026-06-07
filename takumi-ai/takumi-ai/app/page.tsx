"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  async function handleSend() {
    if (message.trim() === "") return;

    const userMessage = message;

    setMessage("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("API Error");
      }

      const data = await response.json();

      setMessages([
        ...messages,
        `あなた: ${userMessage}`,
        `AI: ${data.reply}`,
      ]);
    } catch (error) {
      setMessages([
        ...messages,
        `あなた: ${userMessage}`,
        "AI: OpenAI APIの利用枠がないため現在は返答できません",
      ]);

      console.error(error);
    }
  }

  return (
    <main className="bg-black text-white h-screen flex flex-col items-center p-6">
      <h1>Takumi AI</h1>

      <div className="bg-gray-800 h-96 border border-gray-700 rounded-lg w-full max-w-3xl">
        {messages.length === 0 && (
          <p>質問を入力してください</p>
        )}

        {messages.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>

      <div className="flex w-full max-w-3xl mt-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
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