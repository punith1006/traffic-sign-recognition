"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, User, Lightbulb } from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { aiAPI, Sign } from "@/lib/api";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    signRef?: Sign;
}

const suggestedQuestions = [
    "What's the difference between yield and stop signs?",
    "How do I recognize warning signs?",
    "What should I do at a railroad crossing?",
];

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", role: "assistant", content: "Hi! I'm your AI Traffic Sign Tutor 🚦 Ask me anything about traffic signs!" },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim() || isTyping) return;

        const userMessage: Message = { id: Date.now().toString(), role: "user", content: inputValue };
        setMessages(m => [...m, userMessage]);
        setInputValue("");
        setIsTyping(true);

        try {
            // Build conversation history for context
            const history = messages.slice(1).map(m => ({ role: m.role, content: m.content }));

            const response = await aiAPI.chat(inputValue, history);

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: response.reply,
                signRef: response.signRef,
            };

            setMessages(m => [...m, assistantMessage]);
        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "Sorry, I encountered an error. Please try again.",
            };
            setMessages(m => [...m, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A1128]">
            <Navbar />
            <main className="pt-20 pb-24 md:pb-8 md:pl-64 flex flex-col h-screen">
                <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col px-4">
                    <div className="py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D9FF] to-[#00F5D4] flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-[#0A1128]" />
                            </div>
                            <div><h1 className="font-semibold text-lg text-white">AI Tutor</h1><p className="text-sm text-[#00F5D4]">Online</p></div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4 pb-4">
                        {messages.map((msg) => (
                            <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`flex gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-[#283048]" : "bg-gradient-to-br from-[#00D9FF] to-[#00F5D4]"}`}>
                                        {msg.role === "user" ? <User className="w-4 h-4 text-[#B4BCC8]" /> : <Sparkles className="w-4 h-4 text-[#0A1128]" />}
                                    </div>
                                    <div className={`rounded-2xl px-4 py-3 ${msg.role === "user" ? "bg-[#00D9FF] text-[#0A1128]" : "bg-[#1A2238] text-white"}`}>
                                        <div className="whitespace-pre-wrap text-sm">{msg.content}</div>
                                        {msg.signRef && (
                                            <div className="mt-3 p-3 rounded-xl bg-[#283048] flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-lg bg-[#0A1128] p-2 flex items-center justify-center">
                                                    <img src={msg.signRef.imageUrl} alt={msg.signRef.name} className="max-w-full max-h-full object-contain" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm text-white">{msg.signRef.name}</p>
                                                    <Badge variant="category" category={msg.signRef.category as "WARNING" | "REGULATORY" | "GUIDE" | "CONSTRUCTION" | "RECREATION"} size="sm">{msg.signRef.category}</Badge>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        {isTyping && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                <div className="flex gap-2 items-center">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#00F5D4] flex items-center justify-center">
                                        <Sparkles className="w-4 h-4 text-[#0A1128]" />
                                    </div>
                                    <div className="bg-[#1A2238] rounded-2xl px-4 py-3 flex gap-1">
                                        <span className="w-2 h-2 rounded-full bg-[#8891A0] animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-2 h-2 rounded-full bg-[#8891A0] animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-2 h-2 rounded-full bg-[#8891A0] animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {messages.length === 1 && (
                        <div className="pb-4">
                            <p className="text-sm text-[#B4BCC8] mb-2 flex items-center gap-2"><Lightbulb className="w-4 h-4" /> Try asking:</p>
                            <div className="flex flex-wrap gap-2">
                                {suggestedQuestions.map((q) => (
                                    <button key={q} onClick={() => setInputValue(q)} className="px-3 py-2 rounded-full bg-[#1A2238] text-sm text-[#B4BCC8] hover:bg-[#283048] hover:text-white">{q}</button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="py-4 border-t border-[#3D4C63]">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                placeholder="Ask about any traffic sign..."
                                className="flex-1 px-4 py-3 rounded-xl bg-[#1A2238] border border-[#3D4C63] text-white placeholder:text-[#8891A0] focus:outline-none focus:ring-2 focus:ring-[#00D9FF]"
                            />
                            <Button onClick={handleSend} disabled={!inputValue.trim() || isTyping} className="px-4"><Send className="w-5 h-5" /></Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
