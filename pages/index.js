import { AnimatePresence, motion } from "framer-motion";
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
  const [lastRemovedMessage, setLastRemovedMessage] = useState();

  function removeMessage(mid) {
    setLastRemovedMessage(mid);
    setMessages((messages) => messages.filter((message) => message.id !== mid));
  }

  let animatingMessages = messages.filter(
    (message) => message.id > lastRemovedMessage
  );

  return (
    <div className="mt-8 px-8">
      <ul className="max-w-sm mx-auto space-y-1 text-sm">
        <AnimatePresence mode="popLayout">
          {messages.map((message, i) => (
            <motion.li
              layout
              exit={{
                opacity: 0,
                scale: 0.9,
              }}
              transition={{
                default: { duration: 0.15 },
                layout: {
                  type: "spring",
                  bounce: 0.45,
                  // duration: 5,
                  duration: animatingMessages.includes(message)
                    ? 0.15 * animatingMessages.indexOf(message) + 1
                    : 1,
                },
              }}
              className="flex"
              style={{
                originX: message.user === "me" ? 1 : 0,
                originY: 0,
              }}
              key={message.id}
            >
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
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
