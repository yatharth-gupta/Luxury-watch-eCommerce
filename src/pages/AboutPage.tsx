import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const milestones = [
    { year: '1847', title: 'The Foundation', description: 'In the heart of Vallée de Joux, master watchmaker Étienne Aethelgard establishes a small atelier dedicated to the pursuit of horological perfection.' },
    { year: '1902', title: 'The First Tourbillon', description: 'The maison produces its first flying tourbillon, a feat of engineering that earns international recognition at the Grand Exhibition in Paris.' },
    { year: '1958', title: 'The Oceanic Expedition', description: 'An Aethelgard chronometer accompanies the Mariana expedition, surviving depths of 10,000 meters — setting a record that stands for decades.' },
    { year: '1989', title: 'The Perpetual Calendar', description: 'Introduction of the Calibre 320-MP, one of the most accurate mechanical perpetual calendars ever produced, requiring correction only once every 122 years.' },
    { year: '2026', title: 'The New Era', description: 'The launch of the Chronographe Royal marks a new chapter — combining centuries of tradition with cutting-edge materials science and design philosophy.' },
];

const values = [
    { title: 'Precision', description: 'Every movement is tested for 500 hours across six positions and five temperatures before it leaves our atelier.', icon: '◈' },
    { title: 'Heritage', description: 'Seven generations of master watchmakers have refined our techniques, ensuring each timepiece is a vessel of accumulated knowledge.', icon: '◇' },
    { title: 'Sustainability', description: 'We source materials responsibly and build timepieces meant to last generations, not seasons. Every watch is designed to be repaired, not replaced.', icon: '○' },
];

export default function AboutPage() {
    return (
        <div className="pt-24 md:pt-32">
            {/* Hero */}
            <section className="relative h-[60vh] min-h-[500px] overflow-hidden mb-24">
                <img
                    src="https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&q=80&w=2000"
                    alt="Watchmaker at work"
                    className="w-full h-full object-cover opacity-40"
                    referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-3xl px-6"
                    >
                        <span className="text-[#C5A059] text-xs font-mono tracking-widest uppercase mb-6 block">Est. 1847</span>
                        <h1 className="text-6xl md:text-8xl lg:text-[120px] font-serif italic tracking-tighter leading-[0.85] mb-6">
                            Our Heritage
                        </h1>
                        <p className="text-white/40 text-sm tracking-wide max-w-lg mx-auto leading-relaxed">
                            Nearly two centuries of relentless pursuit of perfection, passed down through seven generations of master watchmakers.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Values */}
            <section className="max-w-[1600px] mx-auto px-6 md:px-12 mb-24 md:mb-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {values.map((v, i) => (
                        <motion.div
                            key={v.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className="text-center px-4"
                        >
                            <span className="text-4xl text-[#C5A059] block mb-6">{v.icon}</span>
                            <h3 className="text-2xl font-serif italic mb-4">{v.title}</h3>
                            <p className="text-white/40 text-sm leading-relaxed">{v.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* The Craft */}
            <section className="border-y border-white/10 py-24 md:py-32">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-[#C5A059] text-xs font-mono tracking-widest uppercase mb-6 block">The Craft</span>
                            <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter mb-8 leading-[0.9]">
                                1,200 Hours<br />
                                <span className="text-[#C5A059]">Per Masterpiece.</span>
                            </h2>
                            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-md">
                                Each Aethelgard timepiece undergoes a journey of transformation that spans months of patient, uncompromising work. From the initial sketch on cotton paper to the final calibration under 40x magnification, no detail is too small to deserve our artisans' full attention.
                            </p>
                            <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-md">
                                Our ateliers employ over 200 artisans — engravers, guilloché specialists, gem-setters, and master polishers — each a virtuoso in their discipline. Together, they bring to life timepieces that transcend function to become art.
                            </p>
                            <Link
                                to="/collections"
                                className="group inline-flex items-center gap-3 micro-label hover:text-[#C5A059] transition-colors"
                            >
                                View Our Creations <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative aspect-square overflow-hidden"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&q=80&w=1200"
                                alt="Watch movement detail"
                                className="w-full h-full object-cover opacity-70"
                                referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-l from-[#0A0A0A]/50 to-transparent" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-24 md:py-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-[#C5A059] text-xs font-mono tracking-widest uppercase mb-4 block">Our Journey</span>
                    <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter">Milestones</h2>
                </motion.div>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />

                    <div className="space-y-16 md:space-y-24">
                        {milestones.map((m, i) => (
                            <motion.div
                                key={m.year}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className={`md:grid md:grid-cols-2 md:gap-16 items-center ${i % 2 === 1 ? 'md:direction-rtl' : ''}`}
                            >
                                <div className={`${i % 2 === 1 ? 'md:order-2 md:text-left' : 'md:text-right'} mb-6 md:mb-0`}>
                                    <span className="text-[#C5A059] text-6xl md:text-8xl font-serif italic opacity-30">{m.year}</span>
                                </div>
                                <div className={`${i % 2 === 1 ? 'md:order-1 md:text-right' : ''}`}>
                                    <h3 className="text-2xl font-serif italic mb-3">{m.title}</h3>
                                    <p className="text-white/40 text-sm leading-relaxed max-w-md">{m.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="border-t border-white/10 py-24 md:py-32">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-serif italic tracking-tighter mb-6">
                            Visit Our Ateliers
                        </h2>
                        <p className="text-white/40 text-sm tracking-wide max-w-lg mx-auto leading-relaxed mb-10">
                            Experience the world of Aethelgard firsthand. Our boutiques offer private consultations and exclusive access to our master watchmakers.
                        </p>
                        <Link
                            to="/contact"
                            className="px-10 py-4 bg-[#C5A059] text-black text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-white transition-colors inline-block"
                        >
                            Contact Us
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
