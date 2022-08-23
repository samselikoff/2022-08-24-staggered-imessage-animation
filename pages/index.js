import { useState } from "react";
import { PlusIcon } from "@heroicons/react/solid";

let seeds = [
  { user: "me", text: "Yo yo" },
  { user: "them", text: "Hey! What's up?" },
  { user: "me", text: "Nm dude. Wrapping up work soon" },
  { user: "them", text: "Nice" },
  { user: "me", text: "Want to lift tonight?" },
  { user: "them", text: "Yep just about finishing up work" },
  { user: "them", text: "Can you give me like 10" },
  { user: "me", text: "Perf" },
  { user: "me", text: "We hitting shoulders today?" },
  { user: "them", text: "Yep" },
  { user: "me", text: "Awesome!" },
  { user: "me", text: "See you soon 💪" },
];

seeds = seeds.map((seed, i) => ({ ...seed, id: i + 1 }));

export default function Home() {
  const [messages, setMessages] = useState(seeds);

  function addMessage() {
    let index = Math.floor(Math.random() * messages.length);
    let newId = messages.length
      ? Math.max(...messages.map((m) => m.id)) + 1
      : 1;
    let newMessage = {
      id: newId,
      user: Math.random() > 0.5 ? "me" : "them",
      text: "Your mom said it's time to come home",
    };

    setMessages([
      ...messages.slice(0, index),
      newMessage,
      ...messages.slice(index),
    ]);
  }

  function removeMessage(message) {
    setMessages((messages) => messages.filter((m) => m.id !== message.id));
  }

  return (
    <div className="max-w-sm mx-auto flex flex-col px-4">
      <div className="text-right mt-4">
        <button
          onClick={addMessage}
          className="hover:bg-gray-100 active:bg-gray-200 rounded-full inline-flex items-center justify-center p-1.5 text-gray-500 hover:text-gray-700"
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>

      <ul className="w-full space-y-1 mt-4 text-sm">
        {messages.map((message) => (
          <li key={message.id} className="flex">
            <button
              onClick={() => removeMessage(message)}
              className={`${
                message.user === "me"
                  ? "bg-blue-500 ml-auto"
                  : "bg-gray-500 mr-auto"
              } px-3 py-1 bg-blue-500 text-white text-left rounded-full`}
            >
              {message.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
