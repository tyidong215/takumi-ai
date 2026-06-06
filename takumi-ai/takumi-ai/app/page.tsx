"use client";

import { useState } from "react";

export default function Home() {
  const[message,setMessage] = useState("");
  const[messages,setMessages] = useState<string[]>([]);

  async function handleSend(){
  const response = await fetch("/api/chat",{
method: "POST",
    headers:{
  "content-type":"application/json",
},
body: JSON.stringify({
  message:message,
}),
  });

  const data = await response.json();

  setMessages([
    ...messages,
    `あなた: ${message}`,
    `AI: ${data.reply}`
  ]);

    setMessage("");
  }
  return (
    <main className="bg-black text-white h-screen flex flex-col items-center p-6">
      <h1>Takumi AI</h1>

      <div className="bg-gray-800 h-96 border border-gray-700 rounded-lg w-full max-w-3xl">
        {messages.length === 0 &&(
      <p>質問を入力してください</p>
        )}
        
        {messages.map((item,index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
      <div className="flex w-full max-w-3xl mt-4">

      <input 
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="border border-white  flex-1"
      />

      <button 
      onClick={handleSend}
      className="bg-emerald-600 px-4 rounded-lg">
        送信
        </button>
        </div>

    </main>
  );
}