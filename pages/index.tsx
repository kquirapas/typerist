import Head from "next/head";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

const MAX_CHAT_WIDTH = 400;

const Bubble: React.FC<{ text: string; active?: boolean }> = ({
  text,
  active = false,
}) => {
  return (
    <>
      {active ? (
        <div
          className={`inline-block max-w-[${MAX_CHAT_WIDTH}px] relative bg-black px-6 py-4 rounded-3xl self-start text-white`}
        >
          {text}
          <span className="animate-pulse duration-75">|</span>
        </div>
      ) : (
        <div
          className={`inline-block max-w-[${MAX_CHAT_WIDTH}px] relative bg-white px-6 py-4 rounded-3xl self-start text-black`}
        >
          {text}
        </div>
      )}
    </>
  );
};

const CHATS_VISIBLE = 4;

export default function Home() {
  const [currentChat, setCurrentChat] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTyping = (e: any) => {
    setCurrentChat(e.target.value);
  };

  const handleEnter = (e: any) => {
    if (!inputRef.current) return;

    const value = inputRef.current.value.trim();

    if (value === "") return;

    if (e.key === "Enter") {
      setHistory((prev) => {
        let newHistory = prev.slice();
        newHistory.push(value);
        return newHistory;
      });
      setCurrentChat("");
      inputRef.current.value = "";
      return;
    }
  };

  return (
    <>
      <Head>
        <title>Typerist</title>
        <meta
          name="description"
          content="Tool you can use to overlay typing chat in your videos"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full min-h-screen bg-chroma-key">
        <div className="absolute bottom-0 left-0 p-8 flex flex-col">
          <div className="mb-8">
            {history.slice(history.length - CHATS_VISIBLE).map((e) => (
              <>
                <Bubble text={e} />
                <span className="h-4 block"></span>
              </>
            ))}
          </div>
          {currentChat.length > 0 && (
            <>
              <motion.div animate={{ y: -20 }}>
                <Bubble text={currentChat} active={true} />
                <span className="h-4 block"></span>
              </motion.div>
            </>
          )}
        </div>
        <div className="p-8 flex flex-col w-full">
          <input
            className="text-5xl"
            onKeyPress={handleEnter}
            onChange={handleTyping}
            ref={inputRef}
            type="text"
          />
        </div>
      </main>
    </>
  );
}
