import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/watches';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const filtered = query.trim()
        ? PRODUCTS.filter(
            (p) =>
                p.name.toLowerCase().includes(query.toLowerCase()) ||
                p.brand.toLowerCase().includes(query.toLowerCase()) ||
                p.description.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 300);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            setQuery('');
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[60] bg-[#050505]/95 backdrop-blur-xl flex flex-col"
                >
                    <div className="max-w-[1200px] w-full mx-auto px-6 md:px-12 pt-24 md:pt-32 flex-1 flex flex-col">
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 md:top-8 md:right-12 p-3 hover:bg-white/5 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Search input */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.15, duration: 0.4 }}
                            className="relative mb-12"
                        >
                            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-white/30" strokeWidth={1} />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search timepieces..."
                                className="w-full bg-transparent border-b border-white/20 focus:border-[#C5A059] outline-none text-3xl md:text-5xl font-serif italic pl-14 pb-6 placeholder:text-white/20 transition-colors"
                            />
                        </motion.div>

                        {/* Results */}
                        <div className="flex-1 overflow-y-auto pb-12">
                            {query.trim() && filtered.length === 0 && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-white/40 text-lg"
                                >
                                    No timepieces found for "{query}"
                                </motion.p>
                            )}

                            <div className="space-y-1">
                                {filtered.map((product, i) => (
                                    <motion.button
                                        key={product.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        onClick={() => {
                                            onClose();
                                            navigate(`/product/${product.id}`);
                                        }}
                                        className="w-full flex items-center gap-6 p-4 hover:bg-white/5 transition-colors group text-left"
                                    >
                                        <div className="w-20 h-20 bg-[#111] flex-shrink-0 overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                                referrerPolicy="no-referrer"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <span className="text-[10px] tracking-[0.2em] opacity-40 uppercase block">{product.brand}</span>
                                            <h3 className="text-xl font-serif italic truncate">{product.name}</h3>
                                            <span className="text-[#C5A059] text-sm">${product.price.toLocaleString()}</span>
                                        </div>
                                        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-60 transition-opacity flex-shrink-0" />
                                    </motion.button>
                                ))}
                            </div>

                            {!query.trim() && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="mt-8"
                                >
                                    <p className="micro-label mb-6">Popular Searches</p>
                                    <div className="flex flex-wrap gap-3">
                                        {['Chronograph', 'Tourbillon', 'Moonphase', 'GMT', 'Titanium', 'Rose Gold'].map((tag) => (
                                            <button
                                                key={tag}
                                                onClick={() => setQuery(tag)}
                                                className="px-5 py-2.5 border border-white/10 text-sm text-white/60 hover:border-[#C5A059] hover:text-[#C5A059] transition-colors"
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
