import { useState } from "react";

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

  function removeMessage(mid) {
    setMessages((messages) => messages.filter((message) => message.id !== mid));
  }

  return (
    <div className="mt-8 px-8">
      <ul className="max-w-sm mx-auto space-y-1 text-sm">
        {messages.map((message) => (
          <li className="flex" key={message.id}>
            <button
              onClick={() => removeMessage(message.id)}
              className={`${
                message.user === "me"
                  ? "bg-blue-500 ml-auto"
                  : "bg-gray-500 mr-auto"
              } px-3 py-1 bg-blue-500 text-white rounded-full`}
            >
              {message.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
