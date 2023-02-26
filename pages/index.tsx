import Head from "next/head";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

const Bubble: React.FC<{
  text: string;
  active?: boolean;
}> = ({ text, active = false }) => {
  return (
    <>
      {active ? (
        <div className="inline-block max-w-[400px] relative bg-fb-white px-6 py-4 rounded-3xl self-start text-black drop-shadow-lg">
          {text}
          <span className="animate-blink duration-75">|</span>
        </div>
      ) : (
        <div className="inline-block max-w-[400px] relative bg-black px-6 py-4 rounded-3xl self-start text-white drop-shadow-lg">
          {text}
        </div>
      )}
    </>
  );
};

const CHATS_VISIBLE = 3;

export default function Home() {
  const [currentChat, setCurrentChat] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);

  const [activeColor, setActiveColor] = useState<string>("#FFFFFF");
  const [oldColor, setOldColor] = useState<string>("#000000");

  const inputRef = useRef<HTMLInputElement>(null);
  const activeChatRef = useRef<HTMLInputElement>(null);
  const oldChatRef = useRef<HTMLInputElement>(null);

  const handleTyping = (e: any) => {
    setCurrentChat(e.target.value);
  };

  const handleEnter = (e: any) => {
    if (!inputRef.current) return;

    const value = inputRef.current.value.trim();

    if (value === "") return;

    if (e.key === "Enter") {
      if (value === "clear") {
        setHistory([]);
        setCurrentChat("");
        inputRef.current.value = "";
        return;
      }

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

  const getOldChats = () => {
    if (history.length > CHATS_VISIBLE) {
      const chats = history.slice(
        history.length - CHATS_VISIBLE,
        history.length
      );
      return chats;
    } else {
      return history;
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
            {getOldChats().map((e, idx) => (
              <div key={idx}>
                <Bubble text={e} />
                <span className="h-4 block"></span>
              </div>
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
            onKeyDown={handleEnter}
            onChange={handleTyping}
            ref={inputRef}
            type="text"
          />
        </div>
      </main>
    </>
  );
}
