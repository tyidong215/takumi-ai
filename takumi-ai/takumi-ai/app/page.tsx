"use client";

import { useState } from "react";

export default function Home() {
  const[message,setMessage] = useState("");
  const[messages,setMessages] = useState<string[]>([]);

  function handleSend(){
  let aiReply = "AI: まだ勉強中です";

  if(message === "こんにちは"){
    aiReply = "AI: こんにちは！";
  }

    setMessages([
      ...messages,
      `あなた: ${message}`,
      aiReply
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
      <div className="flex w-full max-w-3xl">

      <input 
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="border border-white  flex-1"
      />

      <button onClick={handleSend}>
        送信
        </button>
        </div>

    </main>
  );
}