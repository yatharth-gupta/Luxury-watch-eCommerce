import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Check, Lock } from 'lucide-react';
import { useAppContext } from '../context';

export default function CheckoutPage() {
    const { cart, clearCart } = useAppContext();
    const navigate = useNavigate();
    const [step, setStep] = useState<'form' | 'confirmed'>('form');
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', address: '', city: '', country: '', zip: '' });

    const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
    const shipping = 0;
    const total = subtotal + shipping;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep('confirmed');
        clearCart();
    };

    if (cart.length === 0 && step !== 'confirmed') {
        return (
            <div className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center text-center px-6">
                <h1 className="text-4xl font-serif italic mb-4">Your Bag is Empty</h1>
                <p className="text-white/40 mb-8">Add some masterpieces before checking out.</p>
                <Link to="/collections" className="px-10 py-4 bg-[#C5A059] text-black text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-white transition-colors">Browse Collections</Link>
            </div>
        );
    }

    if (step === 'confirmed') {
        return (
            <div className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center text-center px-6">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="w-20 h-20 rounded-full border-2 border-[#C5A059] flex items-center justify-center mb-8">
                    <Check className="w-10 h-10 text-[#C5A059]" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <h1 className="text-5xl md:text-7xl font-serif italic tracking-tighter mb-4">Thank You</h1>
                    <p className="text-white/40 text-sm tracking-wide mb-2">Order #{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                    <p className="text-white/40 text-sm tracking-wide mb-10 max-w-md mx-auto">Your order has been placed successfully. A confirmation email will be sent to {form.email || 'your email'}.</p>
                    <Link to="/" className="px-10 py-4 bg-[#C5A059] text-black text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-white transition-colors inline-block">Return Home</Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="pt-24 md:pt-32 pb-24">
            <div className="max-w-[1600px] mx-auto px-6 md:px-12">
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-10">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"><ArrowLeft className="w-4 h-4" /> Back</button>
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-serif italic tracking-tighter mb-12">Checkout</motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-10">
                        <div>
                            <h2 className="text-xl font-serif italic mb-6">Shipping Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div><label className="micro-label mb-2 block">First Name</label><input type="text" name="firstName" value={form.firstName} onChange={handleChange} required className="w-full bg-transparent border-b border-white/20 focus:border-[#C5A059] outline-none py-3 text-sm font-light transition-colors" /></div>
                                <div><label className="micro-label mb-2 block">Last Name</label><input type="text" name="lastName" value={form.lastName} onChange={handleChange} required className="w-full bg-transparent border-b border-white/20 focus:border-[#C5A059] outline-none py-3 text-sm font-light transition-colors" /></div>
                            </div>
                            <div className="mt-6"><label className="micro-label mb-2 block">Email</label><input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full bg-transparent border-b border-white/20 focus:border-[#C5A059] outline-none py-3 text-sm font-light transition-colors" /></div>
                            <div className="mt-6"><label className="micro-label mb-2 block">Address</label><input type="text" name="address" value={form.address} onChange={handleChange} required className="w-full bg-transparent border-b border-white/20 focus:border-[#C5A059] outline-none py-3 text-sm font-light transition-colors" /></div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                                <div><label className="micro-label mb-2 block">City</label><input type="text" name="city" value={form.city} onChange={handleChange} required className="w-full bg-transparent border-b border-white/20 focus:border-[#C5A059] outline-none py-3 text-sm font-light transition-colors" /></div>
                                <div><label className="micro-label mb-2 block">Country</label><input type="text" name="country" value={form.country} onChange={handleChange} required className="w-full bg-transparent border-b border-white/20 focus:border-[#C5A059] outline-none py-3 text-sm font-light transition-colors" /></div>
                                <div><label className="micro-label mb-2 block">Postal Code</label><input type="text" name="zip" value={form.zip} onChange={handleChange} required className="w-full bg-transparent border-b border-white/20 focus:border-[#C5A059] outline-none py-3 text-sm font-light transition-colors" /></div>
                            </div>
                        </div>

                        <button type="submit" className="w-full md:w-auto group px-12 py-5 bg-[#C5A059] text-black text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-white transition-colors inline-flex items-center justify-center gap-3">
                            <Lock className="w-4 h-4" /> Place Order — ${total.toLocaleString()}
                        </button>
                    </form>

                    {/* Order Summary */}
                    <div className="lg:border-l lg:border-white/10 lg:pl-12">
                        <h2 className="text-xl font-serif italic mb-6">Order Summary</h2>
                        <div className="space-y-6 mb-8">
                            {cart.map(item => (
                                <div key={item.product.id} className="flex gap-4">
                                    <div className="w-16 aspect-[4/5] bg-[#111] flex-shrink-0"><img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" /></div>
                                    <div className="flex-1">
                                        <h3 className="font-serif italic text-sm">{item.product.name}</h3>
                                        <p className="text-white/40 text-xs">Qty {item.quantity}</p>
                                        <p className="text-sm mt-1">${(item.product.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-white/10 pt-6 space-y-3">
                            <div className="flex justify-between text-sm"><span className="text-white/40">Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
                            <div className="flex justify-between text-sm"><span className="text-white/40">Shipping</span><span className="text-[#C5A059]">Complimentary</span></div>
                            <div className="flex justify-between text-lg font-serif italic border-t border-white/10 pt-4 mt-4"><span>Total</span><span>${total.toLocaleString()}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
