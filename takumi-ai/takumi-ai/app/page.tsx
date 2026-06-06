"use client";

import { useState } from "react";

export default function Home() {
  const[message,setMessage] = useState("");
  const[messages,setMessages] = useState<string[]>([]);

  function handleSend(){
    setMessages([
      ...messages,
      `あなた: ${message}`,
      "AI: まだOpenAIには接続していません"
      ]);
    setMessage("");
  }
  return (
    <main className="bg-black text-white h-screen">
      <h1>Takumi AI</h1>

      <div className="bg-gray-800 h-96 border border-gray-700 rounded-lg w-full max-w-3xl">
        {messages.length === 0 &&(
      <p>質問を入力してください</p>
        )}
        
        {messages.map((item,index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
      
      <input 
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="border border-white"
      />
      <p>{message}</p>

      <button onClick={handleSend}>
        送信
        </button>

    </main>
  );
}