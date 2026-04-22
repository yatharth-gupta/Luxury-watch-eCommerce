import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';

const boutiques = [
    { city: 'Geneva', address: '12 Rue du Rhône, 1204 Geneva', phone: '+41 22 311 00 00', hours: 'Mon–Sat: 10:00 — 19:00' },
    { city: 'Paris', address: '28 Place Vendôme, 75001 Paris', phone: '+33 1 42 60 00 00', hours: 'Mon–Sat: 10:30 — 19:30' },
    { city: 'New York', address: '725 Fifth Avenue, NY 10022', phone: '+1 212 758 0000', hours: 'Mon–Sat: 10:00 — 18:00' },
];

export default function ContactPage() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: 'general', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };

    return (
        <div className="pt-24 md:pt-32">
            <section className="max-w-[1600px] mx-auto px-6 md:px-12 mb-16 md:mb-24">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
                    <span className="text-[#C5A059] text-xs font-mono tracking-widest uppercase mb-6 block">Get in Touch</span>
                    <h1 className="text-5xl md:text-7xl lg:text-[100px] leading-[0.85] font-serif italic tracking-tighter mb-6">Contact</h1>
                    <p className="text-white/40 text-sm tracking-wide leading-relaxed">Our concierge team is at your disposal for any inquiry regarding our collections, services, or private consultations.</p>
                </motion.div>
            </section>

            <section className="max-w-[1600px] mx-auto px-6 md:px-12 pb-24 md:pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                        <h2 className="text-3xl font-serif italic mb-8">Send a Message</h2>
                        {submitted ? (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="border border-[#C5A059]/30 p-12 text-center">
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="w-16 h-16 rounded-full border-2 border-[#C5A059] flex items-center justify-center mx-auto mb-6">
                                    <Check className="w-8 h-8 text-[#C5A059]" />
                                </motion.div>
                                <h3 className="text-2xl font-serif italic mb-3">Message Received</h3>
                                <p className="text-white/40 text-sm leading-relaxed mb-8">Thank you. Our concierge team will respond within 24 hours.</p>
                                <button onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', subject: 'general', message: '' }); }} className="micro-label border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-colors">Send Another</button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="micro-label mb-3 block">Full Name</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-transparent border-b border-white/20 focus:border-[#C5A059] outline-none py-3 text-sm font-light transition-colors placeholder:text-white/20" placeholder="Your name" />
                                    </div>
                                    <div>
                                        <label className="micro-label mb-3 block">Email</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-transparent border-b border-white/20 focus:border-[#C5A059] outline-none py-3 text-sm font-light transition-colors placeholder:text-white/20" placeholder="your@email.com" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="micro-label mb-3 block">Phone (Optional)</label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 focus:border-[#C5A059] outline-none py-3 text-sm font-light transition-colors placeholder:text-white/20" placeholder="+1 234 567 8900" />
                                    </div>
                                    <div>
                                        <label className="micro-label mb-3 block">Subject</label>
                                        <select name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 focus:border-[#C5A059] outline-none py-3 text-sm font-light transition-colors text-white/80 appearance-none cursor-pointer">
                                            <option value="general" className="bg-[#0A0A0A]">General Inquiry</option>
                                            <option value="purchase" className="bg-[#0A0A0A]">Purchase Assistance</option>
                                            <option value="service" className="bg-[#0A0A0A]">Care & Repair</option>
                                            <option value="boutique" className="bg-[#0A0A0A]">Boutique Appointment</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="micro-label mb-3 block">Message</label>
                                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full bg-transparent border-b border-white/20 focus:border-[#C5A059] outline-none py-3 text-sm font-light transition-colors resize-none placeholder:text-white/20" placeholder="How may we assist you?" />
                                </div>
                                <button type="submit" className="group px-10 py-4 bg-[#C5A059] text-black text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-white transition-colors inline-flex items-center gap-3">
                                    <Send className="w-4 h-4" /> Send Message
                                </button>
                            </form>
                        )}
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
                        <h2 className="text-3xl font-serif italic mb-8">Our Boutiques</h2>
                        <div className="space-y-10">
                            {boutiques.map((b, i) => (
                                <motion.div key={b.city} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="border border-white/5 p-8 hover:border-[#C5A059]/30 transition-colors duration-500">
                                    <h3 className="text-2xl font-serif italic mb-5 text-[#C5A059]">{b.city}</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3 text-sm text-white/50"><MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/30" strokeWidth={1} /><span>{b.address}</span></div>
                                        <div className="flex items-center gap-3 text-sm text-white/50"><Phone className="w-4 h-4 flex-shrink-0 text-white/30" strokeWidth={1} /><span>{b.phone}</span></div>
                                        <div className="flex items-center gap-3 text-sm text-white/50"><Clock className="w-4 h-4 flex-shrink-0 text-white/30" strokeWidth={1} /><span>{b.hours}</span></div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="mt-10 p-8 bg-[#111] border border-white/5">
                            <h3 className="text-lg font-serif italic mb-4">Direct Line</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-white/50"><Mail className="w-4 h-4 text-[#C5A059]" strokeWidth={1} /><span>concierge@aethelgard.com</span></div>
                                <div className="flex items-center gap-3 text-sm text-white/50"><Phone className="w-4 h-4 text-[#C5A059]" strokeWidth={1} /><span>+41 22 311 00 00</span></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
