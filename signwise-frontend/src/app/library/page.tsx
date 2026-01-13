"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { signsAPI, Sign } from "@/lib/api";

const categories = ["ALL", "WARNING", "REGULATORY", "GUIDE", "CONSTRUCTION", "RECREATION"] as const;

export default function LibraryPage() {
    const [signs, setSigns] = useState<Sign[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>("ALL");
    const [selectedSign, setSelectedSign] = useState<Sign | null>(null);

    // Fetch signs
    useEffect(() => {
        const fetchSigns = async () => {
            setIsLoading(true);
            try {
                const data = await signsAPI.getAll({
                    category: selectedCategory !== "ALL" ? selectedCategory : undefined,
                    search: searchQuery || undefined,
                });
                setSigns(data);
            } catch (error) {
                console.error("Failed to fetch signs:", error);
            } finally {
                setIsLoading(false);
            }
        };

        const debounce = setTimeout(fetchSigns, 300);
        return () => clearTimeout(debounce);
    }, [selectedCategory, searchQuery]);

    return (
        <div className="min-h-screen bg-[#0A1128]">
            <Navbar />
            <main className="pt-20 pb-24 md:pb-8 md:pl-64">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="mb-6">
                            <h1 className="font-bold text-3xl text-white mb-2">Sign Library</h1>
                            <p className="text-[#B4BCC8]">Browse and learn about all traffic signs</p>
                        </div>

                        <div className="relative mb-6">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8891A0]" />
                            <input
                                type="text"
                                placeholder="Search signs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#1A2238] border border-[#3D4C63] text-white placeholder:text-[#8891A0] focus:outline-none focus:ring-2 focus:ring-[#00D9FF]"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat ? "bg-[#00D9FF] text-[#0A1128]" : "bg-[#1A2238] text-[#B4BCC8] hover:bg-[#283048]"}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <p className="text-sm text-[#B4BCC8] mb-4">
                            {isLoading ? "Loading..." : `Showing ${signs.length} signs`}
                        </p>

                        {isLoading ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                    <div key={i} className="rounded-2xl bg-[#1A2238] h-48 animate-pulse" />
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                {signs.map((sign, i) => (
                                    <motion.div key={sign.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                                        <Card variant="interactive" padding="sm" className="cursor-pointer" onClick={() => setSelectedSign(sign)}>
                                            <CardContent>
                                                <div className="aspect-square rounded-xl bg-[#283048] p-4 flex items-center justify-center mb-3 relative group">
                                                    <img src={sign.imageUrl} alt={sign.name} className="max-w-full max-h-full object-contain" />
                                                </div>
                                                <h3 className="font-medium text-sm text-white mb-1 line-clamp-1">{sign.name}</h3>
                                                <Badge variant="category" category={sign.category} size="sm">{sign.category}</Badge>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {!isLoading && signs.length === 0 && (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#1A2238] flex items-center justify-center">
                                    <Search className="w-8 h-8 text-[#8891A0]" />
                                </div>
                                <h3 className="font-semibold text-white mb-2">No signs found</h3>
                                <p className="text-[#B4BCC8]">Try adjusting your search or filters</p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </main>

            {selectedSign && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A1128]/80 backdrop-blur-sm" onClick={() => setSelectedSign(null)}>
                    <motion.div className="bg-[#283048] rounded-2xl max-w-lg w-full max-h-[80vh] overflow-auto" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()}>
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <Badge variant="category" category={selectedSign.category}>{selectedSign.category}</Badge>
                                <button onClick={() => setSelectedSign(null)} className="p-2 rounded-full hover:bg-[#1A2238]">✕</button>
                            </div>
                            <div className="aspect-square max-w-[200px] mx-auto rounded-xl bg-[#1A2238] p-6 mb-4">
                                <img src={selectedSign.imageUrl} alt={selectedSign.name} className="w-full h-full object-contain" />
                            </div>
                            <h2 className="font-bold text-2xl text-white text-center mb-2">{selectedSign.name}</h2>
                            <p className="text-[#B4BCC8] text-center mb-6">{selectedSign.description}</p>
                            <div className="p-4 rounded-xl bg-[#1A2238] mb-6">
                                <h4 className="font-semibold text-sm text-white mb-2">Rules & Actions</h4>
                                <p className="text-sm text-[#B4BCC8]">{selectedSign.rules}</p>
                            </div>
                            <div className="flex gap-3">
                                <Button className="flex-1">Practice This Sign</Button>
                                <Button variant="secondary" className="flex-1">Add to Favorites</Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
