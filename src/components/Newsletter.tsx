import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setEmail('');
            }, 3000);
        }
    };

    return (
        <section className="relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0F0D08] to-[#0A0A0A]" />

            <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 py-24 md:py-32">
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="text-[#C5A059] text-xs font-mono tracking-widest uppercase mb-6 block">
                            Stay Informed
                        </span>
                        <h2 className="text-4xl md:text-6xl font-serif italic tracking-tighter mb-6">
                            Join the Inner Circle
                        </h2>
                        <p className="text-white/40 text-sm tracking-wide leading-relaxed mb-12 max-w-md mx-auto">
                            Receive exclusive previews of new collections, invitations to private events, and stories from our ateliers.
                        </p>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        onSubmit={handleSubmit}
                        className="relative max-w-lg mx-auto"
                    >
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email address"
                            required
                            className="w-full bg-transparent border-b border-white/20 focus:border-[#C5A059] outline-none text-lg py-4 pr-14 placeholder:text-white/20 transition-colors font-light"
                        />
                        <button
                            type="submit"
                            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 text-[#C5A059] hover:text-white transition-colors"
                        >
                            {submitted ? (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                    <Check className="w-5 h-5" />
                                </motion.div>
                            ) : (
                                <ArrowRight className="w-5 h-5" />
                            )}
                        </button>
                    </motion.form>

                    {submitted && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[#C5A059] text-sm mt-6"
                        >
                            Welcome to the inner circle.
                        </motion.p>
                    )}
                </div>
            </div>
        </section>
    );
}
