'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Loader2 } from 'lucide-react';
import { getSigns, type Sign } from '@/lib/api';

const categoryColors: Record<string, string> = {
    regulatory: 'bg-red-500/20 text-red-400 border-red-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    guide: 'bg-green-500/20 text-green-400 border-green-500/30',
    construction: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    discovered: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    all: 'bg-primary/20 text-primary border-primary/30',
};

const categoryEmojis: Record<string, string> = {
    regulatory: '⛔',
    warning: '⚠️',
    guide: '🛣️',
    construction: '🚧',
    discovered: '🔍',
};

export default function LibraryPage() {
    const [signs, setSigns] = useState<Sign[]>([]);
    const [categories, setCategories] = useState<string[]>(['all']);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedSign, setSelectedSign] = useState<Sign | null>(null);
    const [discoveredIds, setDiscoveredIds] = useState<string[]>([]);

    // Load discovered sign IDs from localStorage
    useEffect(() => {
        const discovered = JSON.parse(localStorage.getItem('signwise_discovered') || '[]');
        setDiscoveredIds(discovered);
    }, []);

    useEffect(() => {
        loadSigns();
    }, [activeCategory]);

    const loadSigns = async () => {
        setLoading(true);
        try {
            // For discovered, fetch all signs and filter client-side
            const categoryToFetch = activeCategory === 'discovered' ? 'all' : activeCategory;
            const data = await getSigns(categoryToFetch);
            setSigns(data.signs || []);
            if (data.categories) {
                setCategories(data.categories);
            }
        } catch (error) {
            console.error('Failed to load signs:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filter signs based on search and discovered status
    const filteredSigns = signs.filter(sign => {
        const matchesSearch = sign.name.toLowerCase().includes(searchQuery.toLowerCase());
        if (activeCategory === 'discovered') {
            return matchesSearch && discoveredIds.includes(sign.id);
        }
        return matchesSearch;
    });

    return (
        <div className="py-8 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-heading font-bold text-white mb-2">
                    Traffic Sign Library
                </h1>
                <p className="text-gray-400">
                    Browse and learn about different traffic signs
                </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search signs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input w-full pl-12"
                    />
                </div>

                {/* Category Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap border ${activeCategory === category
                                ? categoryColors[category] || categoryColors['all']
                                : 'bg-surface border-white/10 text-gray-400 hover:text-white'
                                }`}
                        >
                            {category === 'all' ? 'All Signs' : category === 'discovered' ? '🔍 Discovered' : category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Signs Grid */}
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            ) : filteredSigns.length === 0 ? (
                <div className="text-center py-16">
                    <p className="text-gray-400">No signs found</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredSigns.map((sign, index) => (
                        <motion.div
                            key={sign.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => setSelectedSign(sign)}
                            className="card card-hover cursor-pointer"
                        >
                            {/* Sign Image */}
                            <div className="w-20 h-20 mx-auto mb-3 bg-surface-elevated rounded-xl flex items-center justify-center overflow-hidden">
                                {sign.imageUrl && sign.imageUrl.startsWith('http') ? (
                                    <img
                                        src={sign.imageUrl}
                                        alt={sign.name}
                                        className="w-16 h-16 object-contain"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                        }}
                                    />
                                ) : (
                                    <span className="text-3xl">{categoryEmojis[sign.category] || '🪧'}</span>
                                )}
                            </div>

                            {/* Sign Name */}
                            <h3 className="font-medium text-white text-center text-sm mb-2 line-clamp-2">
                                {sign.name}
                            </h3>

                            {/* Category Badge */}
                            <div className="flex justify-center">
                                <span className={`badge border ${categoryColors[sign.category]}`}>
                                    {sign.category}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Sign Detail Modal */}
            {selectedSign && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
                    onClick={() => setSelectedSign(null)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="card max-w-lg w-full max-h-[80vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-24 h-24 bg-surface-elevated rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                                {selectedSign.imageUrl && selectedSign.imageUrl.startsWith('http') ? (
                                    <img
                                        src={selectedSign.imageUrl}
                                        alt={selectedSign.name}
                                        className="w-20 h-20 object-contain"
                                    />
                                ) : (
                                    <span className="text-4xl">{categoryEmojis[selectedSign.category] || '🪧'}</span>
                                )}
                            </div>
                            <div>
                                <h2 className="text-xl font-heading font-bold text-white mb-1">
                                    {selectedSign.name}
                                </h2>
                                <span className={`badge border ${categoryColors[selectedSign.category]}`}>
                                    {selectedSign.category}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium text-gray-400 mb-1">Description</h4>
                                <p className="text-white">{selectedSign.description}</p>
                            </div>

                            <div className="p-4 bg-surface-elevated rounded-xl">
                                <h4 className="text-sm font-medium text-gray-400 mb-1">What to do</h4>
                                <p className="text-white">{selectedSign.rules}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setSelectedSign(null)}
                            className="w-full mt-6 btn-secondary"
                        >
                            Close
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
