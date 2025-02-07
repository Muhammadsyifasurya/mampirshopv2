"use client";
import { useUser } from "@/context/AuthContext";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

interface ChatMessage {
  id: number;
  name: string;
  role: string;
  message: string;
  avatar: string;
}

const Chatbox = () => {
  // Inisialisasi state langsung dari localStorage
  const { user } = useUser();
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== "undefined") {
      const savedMessages = localStorage.getItem("chatMessages");
      return savedMessages ? JSON.parse(savedMessages) : [];
    }
    return [];
  });

  const [input, setInput] = useState("");
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const isFirstLoad = useRef(true);

  // Simpan ke localStorage setiap kali messages berubah, kecuali saat load pertama
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    console.log("Menyimpan pesan ke localStorage:", messages);
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === "" || !user) return;

    const newMessage: ChatMessage = {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      role: user.role,
      message: input,
    };

    // Tambahkan pesan baru ke daftar
    setMessages((prev) => [...prev, newMessage]);
    setInput(""); // Reset input setelah mengirim pesan
  };

  const deleteMessage = (index: number) => {
    const updatedMessages = messages.filter((_, i) => i !== index);
    setMessages(updatedMessages);
    localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("chatMessages");
  };

  // Menentukan penerima chat dari pesan terakhir yang bukan milik user saat ini
  const recipientUsers = messages.find((msg) => msg.id !== user?.id);
  // Menentukan penerima chat berdasarkan selectedUser
  const recipient = messages.find((msg) => msg.id === selectedUser);

  const uniqueUsers = Array.from(new Set(messages.map((msg) => msg.id))).map(
    (id) => messages.find((msg) => msg.id === id)
  );

  return (
    <div className="w-[300px] h-[400px] overflow-y-auto bg-white shadow-lg rounded-lg p-4 flex flex-col">
      {user?.role === "admin" ? (
        <>
          {!selectedUser ? (
            <div className="p-3 bg-[#111B21] rounded-t-lg overflow-y-auto h-full text-white">
              <h3 className="font-semibold">All Chats</h3>
              {uniqueUsers.map(
                (usr) =>
                  usr && (
                    <div
                      key={usr.id}
                      className="flex items-center gap-3 p-2 cursor-pointer my-2 border-[1px] hover:bg-gray-400 rounded-xl"
                      onClick={() => setSelectedUser(usr.id)}
                    >
                      {usr.avatar ? (
                        <div className="rounded-full p-2 border-[1px] border-white">
                          <Image
                            src={usr.avatar}
                            alt={usr.name}
                            width={30}
                            height={30}
                            className="rounded-full"
                          />
                        </div>
                      ) : (
                        <div className="rounded-full p-2 border-[1px] border-white">
                          <Image
                            src="/profile.svg"
                            alt="Profile Icon"
                            width={20}
                            height={20}
                            style={{
                              filter:
                                "invert(63%) sepia(7%) saturate(232%) hue-rotate(175deg) brightness(90%) contrast(89%)",
                            }}
                          />
                        </div>
                      )}
                      <p>{usr.name}</p>
                    </div>
                  )
              )}
            </div>
          ) : null}

          {selectedUser && (
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-xs text-blue-500 font-bold hover:text-[#202C33] transition-all ease-in-out duration-300"
                >
                  &lt; Kembali
                </button>
              </div>
              {/* Header Chat */}
              {recipient && (
                <div className="flex items-center gap-3 px-6 justify-between bg-[#202C33] h-14 rounded-t-lg">
                  <div className="flex items-center gap-3">
                    {recipient.avatar ? (
                      <div className="rounded-full border-[1px] border-white overflow-hidden">
                        <Image
                          src={recipient.avatar}
                          alt={recipient.name}
                          width={25}
                          height={25}
                        />
                      </div>
                    ) : (
                      <div className="rounded-full p-2 border-[1px] border-white">
                        <Image
                          src="/profile.svg"
                          alt="Profile Icon"
                          width={20}
                          height={20}
                          style={{
                            filter:
                              "invert(63%) sepia(7%) saturate(232%) hue-rotate(175deg) brightness(90%) contrast(89%)",
                          }}
                        />
                      </div>
                    )}
                    <p className="font-semibold text-white">{recipient.name}</p>
                  </div>
                  <button
                    onClick={clearChat}
                    className="text-xs text-white rounded-xl border-[1px] p-2 hover:text-gray-200 hover:bg-slate-700 transition-all ease-in-out duration-300 "
                  >
                    Clear Chats
                  </button>
                </div>
              )}
              <div className="flex-1 overflow-y-auto">
                {messages
                  .filter(
                    (msg) =>
                      selectedUser === null ||
                      msg.id === selectedUser ||
                      msg.id === user?.id
                  )
                  .map((msg, index) => (
                    <div key={index}>
                      <div
                        className={`flex mt-3 ${
                          user && msg.id === user.id
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`p-3 max-w-xs rounded-lg text-white shadow-md ${
                            msg.id === user?.id
                              ? "bg-[#005C4B]"
                              : "bg-[#202C33]"
                          }`}
                        >
                          <p
                            className={`text-sm font-semibold ${
                              msg.id === user?.id
                                ? "text-[#47AED3]"
                                : "text-[#06CF9C]"
                            }`}
                          >
                            {msg.role === "customer"
                              ? msg.name
                              : msg.name + " (CS)"}
                          </p>
                          <div className="flex gap-5">
                            <p className="text-sm min-w-20 max-w-32">
                              {msg.message}
                            </p>
                            <button
                              onClick={() => deleteMessage(index)}
                              className="text-xs text-red-300 float-right"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="mt-2 flex">
                <input
                  title="message"
                  type="text"
                  placeholder="Tulis pesan..."
                  className="flex-1 p-2 border rounded"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  className="ml-2 p-2 w-9 bg-blue-500 text-white rounded"
                >
                  ➤
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {recipientUsers && (
            <div className="flex items-center gap-3 px-6 justify-between bg-[#202C33] h-14 rounded-t-lg">
              <div className="flex items-center gap-3">
                {recipientUsers.avatar ? (
                  <div className="rounded-full border-[1px] border-white overflow-hidden">
                    <Image
                      src={recipientUsers.avatar}
                      alt={recipientUsers.name}
                      width={25}
                      height={25}
                    />
                  </div>
                ) : (
                  <div className="rounded-full p-2 border-[1px] border-white">
                    <Image
                      src="/profile.svg"
                      alt="Profile Icon"
                      width={20}
                      height={20}
                      style={{
                        filter:
                          "invert(63%) sepia(7%) saturate(232%) hue-rotate(175deg) brightness(90%) contrast(89%)",
                      }}
                    />
                  </div>
                )}
                <p className="font-semibold text-white">
                  {recipientUsers.name}
                </p>
              </div>
              <button
                onClick={clearChat}
                className="text-xs text-white rounded-xl border-[1px] p-2 hover:text-gray-200 hover:bg-slate-700 transition-all ease-in-out duration-300 "
              >
                Clear Chats
              </button>
            </div>
          )}
          <div className="flex-1 overflow-y-auto">
            {messages
              .filter(
                (msg) =>
                  selectedUser === null ||
                  msg.id === selectedUser ||
                  msg.id === user?.id
              )
              .map((msg, index) => (
                <div key={index}>
                  <div
                    className={`flex mt-3 ${
                      user && msg.id === user.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-3 max-w-xs rounded-lg text-white shadow-md ${
                        msg.id === user?.id ? "bg-[#005C4B]" : "bg-[#202C33]"
                      }`}
                    >
                      <p
                        className={`text-sm font-semibold ${
                          msg.id === user?.id
                            ? "text-[#47AED3]"
                            : "text-[#06CF9C]"
                        }`}
                      >
                        {msg.role === "customer"
                          ? msg.name
                          : msg.name + " (CS)"}
                      </p>
                      <div className="flex gap-5">
                        <p className="text-sm min-w-20 max-w-32">
                          {msg.message}
                        </p>
                        <button
                          onClick={() => deleteMessage(index)}
                          className="text-xs text-red-300 float-right"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="mt-2 flex">
            <input
              title="message"
              type="text"
              placeholder="Tulis pesan..."
              className="flex-1 p-2 border rounded"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="ml-2 p-2 w-9 bg-blue-500 text-white rounded"
            >
              ➤
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbox;
