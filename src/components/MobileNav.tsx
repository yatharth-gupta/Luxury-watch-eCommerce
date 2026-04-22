import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Collections', path: '/collections' },
    { label: 'Our Heritage', path: '/about' },
    { label: 'Contact', path: '/contact' },
];

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed left-0 top-0 bottom-0 w-[85%] max-w-[400px] bg-[#0A0A0A] border-r border-white/10 z-50 flex flex-col"
                    >
                        <div className="p-6 flex items-center justify-between border-b border-white/10">
                            <span className="text-lg tracking-[0.4em] font-serif font-light italic uppercase">AETHELGARD</span>
                            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <nav className="flex-1 flex flex-col justify-center px-8">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={onClose}
                                        className="block text-4xl font-serif italic py-4 text-white/80 hover:text-[#C5A059] transition-colors hover:pl-4 transition-all duration-300"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <div className="p-8 border-t border-white/10">
                            <p className="micro-label mb-4">Follow Us</p>
                            <div className="flex gap-6">
                                <span className="text-sm text-white/50 hover:text-white cursor-pointer transition-colors">Instagram</span>
                                <span className="text-sm text-white/50 hover:text-white cursor-pointer transition-colors">Journal</span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
