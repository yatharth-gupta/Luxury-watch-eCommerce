import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Newsletter from '../components/Newsletter';
import { PRODUCTS } from '../data/watches';

/* ─────────────────────────────────────────────
   Hero — rotates through all 6 products
───────────────────────────────────────────── */
function Hero() {
    const [index, setIndex] = useState(0);
    const featured = PRODUCTS[index];

    // Auto-advance hero every 6 s
    useEffect(() => {
        const id = setInterval(() => setIndex(i => (i + 1) % PRODUCTS.length), 6000);
        return () => clearInterval(id);
    }, []);

    return (
        <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
            {/* Background image – cross-fade on product change */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={featured.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    <motion.img
                        src={featured.image}
                        alt={featured.name}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.08 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 6, ease: 'easeOut' }}
                        referrerPolicy="no-referrer"
                    />
                    {/* Layered gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-transparent h-48" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-transparent" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 h-full flex flex-col justify-end pb-24 md:pb-32">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={featured.id + '-text'}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.7 }}
                        className="max-w-3xl"
                    >
                        <span className="text-[#C5A059] text-xs font-mono tracking-widest uppercase mb-5 block">
                            {featured.reference} — {featured.brand}
                        </span>
                        <h1 className="text-[72px] sm:text-[96px] lg:text-[128px] leading-[0.85] font-serif italic tracking-tighter mb-6">
                            {featured.name.split(' ').map((word, i) => (
                                <span key={i} className={i === featured.name.split(' ').length - 1 ? 'text-[#C5A059]' : ''}>
                                    {word}{' '}
                                </span>
                            ))}
                        </h1>
                        <p className="text-white/50 text-sm leading-relaxed max-w-md mb-10 hidden sm:block">
                            {featured.description}
                        </p>
                        <div className="flex items-center gap-8">
                            <Link
                                to={`/product/${featured.id}`}
                                className="group px-10 py-4 bg-[#C5A059] text-black text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-white transition-colors inline-flex items-center gap-3"
                            >
                                Discover Timepiece
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <span className="text-2xl font-serif italic hidden sm:inline-block text-white/80">
                                ${featured.price.toLocaleString()}
                            </span>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Slide dots */}
                <div className="absolute bottom-10 right-6 md:right-12 flex gap-2">
                    {PRODUCTS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`transition-all duration-300 rounded-full ${i === index ? 'w-8 h-1.5 bg-[#C5A059]' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'}`}
                            aria-label={`View ${PRODUCTS[i].name}`}
                        />
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            >
                <span className="text-[9px] tracking-[0.3em] uppercase text-white/25">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent"
                />
            </motion.div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   Brand stats strip
───────────────────────────────────────────── */
function StatsStrip() {
    const stats = [
        { value: '1847', label: 'Established' },
        { value: '6', label: 'Unique Collections' },
        { value: '1,200+', label: 'Hours Per Piece' },
        { value: '7', label: 'Generations of Masters' },
    ];
    return (
        <section className="border-y border-white/8 bg-[#080808]">
            <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/8">
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="py-10 px-6 md:px-12 text-center"
                        >
                            <span className="block text-3xl md:text-4xl font-serif italic text-[#C5A059] mb-2">{s.value}</span>
                            <span className="text-[10px] tracking-[0.25em] uppercase text-white/35">{s.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   Product grid — all 6 watches
───────────────────────────────────────────── */
function ProductGrid() {
    return (
        <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-24 md:py-32">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-5xl md:text-7xl lg:text-[90px] leading-[0.85] font-serif italic tracking-tighter mb-4">
                        Masterpieces.
                    </h2>
                    <p className="text-white/40 text-sm tracking-wide max-w-md leading-relaxed mt-6">
                        Six distinct horological expressions — each a singular achievement in the art of timekeeping.
                    </p>
                </motion.div>
                <Link
                    to="/collections"
                    className="hidden md:flex items-center gap-2 micro-label hover:text-[#C5A059] transition-colors mb-4 group"
                >
                    View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {PRODUCTS.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                ))}
            </div>

            <div className="text-center mt-16 md:hidden">
                <Link
                    to="/collections"
                    className="inline-flex items-center gap-2 px-10 py-4 border border-white/20 micro-label hover:bg-white hover:text-black transition-colors"
                >
                    View All Collections <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   Featured spotlight — Tourbillon Squelette
   (highest-priced / most prestigious piece)
───────────────────────────────────────────── */
function FeaturedSpotlight() {
    const spotlight = PRODUCTS.find(p => p.id === 'p3')!; // Tourbillon Squelette

    return (
        <section className="border-y border-white/8 bg-[#070707]">
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-24 md:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative aspect-[4/5] overflow-hidden group"
                    >
                        <img
                            src={spotlight.image}
                            alt={spotlight.name}
                            className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070707]/60 via-transparent to-transparent" />
                        <div className="absolute top-6 left-6 border border-[#C5A059]/40 px-4 py-2">
                            <span className="text-[#C5A059] text-[9px] tracking-[0.3em] uppercase font-bold">Pièce de Résistance</span>
                        </div>
                    </motion.div>

                    {/* Copy */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:pl-8"
                    >
                        <span className="text-[#C5A059] text-xs font-mono tracking-widest uppercase mb-6 block">
                            {spotlight.reference} · {spotlight.brand}
                        </span>
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif italic tracking-tighter mb-6 leading-[0.9]">
                            {spotlight.name}
                        </h2>
                        <p className="text-white/45 text-sm leading-relaxed mb-6 max-w-md">
                            {spotlight.description}
                        </p>

                        {/* Mini spec table */}
                        <div className="space-y-3 mb-10 border-t border-white/8 pt-8">
                            {[
                                { label: 'Movement', value: spotlight.movement },
                                { label: 'Case', value: spotlight.caseMaterial },
                                { label: 'Complication', value: 'Flying Tourbillon' },
                            ].map(spec => (
                                <div key={spec.label} className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                                    <span className="text-[10px] tracking-[0.2em] uppercase text-white/35">{spec.label}</span>
                                    <span className="text-white/70 font-light">{spec.value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-8">
                            <Link
                                to={`/product/${spotlight.id}`}
                                className="group px-10 py-4 bg-[#C5A059] text-black text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-white transition-colors inline-flex items-center gap-3"
                            >
                                Acquire <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <span className="text-3xl font-serif italic text-white/80">${spotlight.price.toLocaleString()}</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   Craft editorial
───────────────────────────────────────────── */
function CraftEditorial() {
    return (
        <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-24 md:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative aspect-[4/5] overflow-hidden"
                >
                    <img
                        src="https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&q=80&w=1200"
                        alt="Watchmaker crafting"
                        className="w-full h-full object-cover opacity-65"
                        referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                        <span className="text-[#C5A059] text-xs font-mono tracking-widest uppercase block mb-3">Editorial</span>
                        <h3 className="text-3xl md:text-4xl font-serif italic">The Art of Time</h3>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="lg:pl-12"
                >
                    <span className="text-[#C5A059] text-xs font-mono tracking-widest uppercase mb-8 block">Savoir Faire</span>
                    <h2 className="text-5xl md:text-6xl font-serif italic tracking-tighter mb-8 leading-[0.9]">
                        Centuries of<br />
                        <span className="text-[#C5A059]">Mastery.</span>
                    </h2>
                    <p className="text-white/40 text-sm tracking-wide leading-relaxed mb-6 max-w-md">
                        Each Aethelgard timepiece requires over 1,200 hours of meticulous hand-finishing. Our master watchmakers perpetuate techniques passed down through seven generations, transforming raw precious metals into instruments of extraordinary precision.
                    </p>
                    <p className="text-white/40 text-sm tracking-wide leading-relaxed mb-12 max-w-md">
                        From the initial sketch to the final calibration, every detail is scrutinised under 40× magnification. This is not manufacturing — this is the patient art of creating legacy.
                    </p>
                    <Link
                        to="/about"
                        className="group inline-flex items-center gap-3 micro-label hover:text-[#C5A059] transition-colors"
                    >
                        Discover Our Heritage
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   Press testimonials
───────────────────────────────────────────── */
function Testimonials() {
    const quotes = [
        {
            text: '"The Chronographe Royal is, without equivocation, the finest split-seconds movement produced this decade."',
            source: 'International Horological Review',
            year: '2025',
        },
        {
            text: '"Aethelgard represents the fearless next frontier of Grand Complication watchmaking — audacious yet profoundly reverent."',
            source: 'Robb Report',
            year: '2026',
        },
        {
            text: '"The Tourbillon Squelette defies belief. Two hundred hours of hand-skeletonising rendered weightless."',
            source: 'Watches & Wonders Geneva',
            year: '2026',
        },
    ];

    return (
        <section className="relative overflow-hidden py-24 md:py-32">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#080808] to-[#0A0A0A]" />
            <div className="relative max-w-[1600px] mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-[#C5A059] text-xs font-mono tracking-widest uppercase block mb-4">Press</span>
                    <h2 className="text-4xl md:text-6xl font-serif italic tracking-tighter">In Their Words</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {quotes.map((q, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className="border border-white/5 p-8 md:p-10 hover:border-[#C5A059]/30 transition-colors duration-500 flex flex-col"
                        >
                            <p className="text-lg font-serif italic text-white/65 leading-relaxed mb-8 flex-1">{q.text}</p>
                            <div className="flex justify-between items-end">
                                <div>
                                    <span className="micro-label text-[#C5A059] block mb-1">{q.source}</span>
                                    <span className="text-white/30 text-xs">{q.year}</span>
                                </div>
                                <div className="w-8 h-px bg-[#C5A059]/40" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   Page export
───────────────────────────────────────────── */
export default function HomePage() {
    return (
        <>
            <Hero />
            <StatsStrip />
            <ProductGrid />
            <FeaturedSpotlight />
            <CraftEditorial />
            <Testimonials />
            <Newsletter />
        </>
    );
}
