import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Footer() {
    return (
        <footer className="border-t border-white/10 mt-20 bg-[#0A0A0A]">
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-24 flex flex-col md:flex-row justify-between gap-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Link to="/">
                        <h2 className="text-2xl tracking-[0.5em] font-serif font-light italic mb-8 uppercase hover:opacity-80 transition-opacity">AETHELGARD</h2>
                    </Link>
                    <p className="text-white/40 text-sm tracking-wide max-w-sm mb-8 leading-relaxed">
                        Crafting the measure of modern eternity. Our timepieces embody the pinnacle of Swiss horological mastery.
                    </p>
                    <div className="flex gap-4">
                        <span className="text-[9px] tracking-[0.2em] opacity-50 uppercase cursor-pointer hover:opacity-100 transition-opacity">Instagram</span>
                        <span className="text-[9px] tracking-[0.2em] opacity-50 uppercase cursor-pointer hover:opacity-100 transition-opacity">Journal</span>
                    </div>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h4 className="micro-label mb-6 text-white text-xs">Collections</h4>
                        <ul className="space-y-4 text-white/50 font-light text-sm">
                            <li><Link to="/collections" className="hover:text-white transition-colors">All Timepieces</Link></li>
                            <li><Link to="/collections?brand=Aethelgard" className="hover:text-white transition-colors">Aethelgard</Link></li>
                            <li><Link to="/collections?brand=Vanguard" className="hover:text-white transition-colors">Vanguard</Link></li>
                            <li><Link to="/collections?brand=Lumina" className="hover:text-white transition-colors">Lumina</Link></li>
                        </ul>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h4 className="micro-label mb-6 text-white text-xs">Maison</h4>
                        <ul className="space-y-4 text-white/50 font-light text-sm">
                            <li><Link to="/about" className="hover:text-white transition-colors">Our Heritage</Link></li>
                            <li><Link to="/about" className="hover:text-white transition-colors">Craftsmanship</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Boutiques</Link></li>
                        </ul>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="col-span-2 md:col-span-1"
                    >
                        <h4 className="micro-label mb-6 text-white text-xs">Services</h4>
                        <ul className="space-y-4 text-white/50 font-light text-sm">
                            <li><Link to="/contact" className="hover:text-white transition-colors">Concierge</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Care & Repair</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </motion.div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/5">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/20 text-xs tracking-wide">© 2026 Aethelgard. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span className="text-white/20 text-xs tracking-wide hover:text-white/40 cursor-pointer transition-colors">Privacy</span>
                        <span className="text-white/20 text-xs tracking-wide hover:text-white/40 cursor-pointer transition-colors">Terms</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
