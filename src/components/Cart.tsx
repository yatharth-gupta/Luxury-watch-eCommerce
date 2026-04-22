import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context';

export default function Cart() {
    const { cart, cartOpen, setCartOpen, removeFromCart, updateQuantity } = useAppContext();
    const navigate = useNavigate();
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <AnimatePresence>
            {cartOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setCartOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 bottom-0 w-full md:w-[480px] bg-[#0A0A0A] border-l border-white/10 z-50 flex flex-col"
                    >
                        <div className="p-6 md:p-8 flex items-center justify-between border-b border-white/10">
                            <h2 className="font-serif text-2xl italic">Your Bag</h2>
                            <button
                                onClick={() => setCartOpen(false)}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 md:p-8">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center mb-6">
                                        <span className="text-3xl font-serif italic text-white/20">0</span>
                                    </div>
                                    <p className="text-white/40 font-light mb-6">Your bag is currently empty.</p>
                                    <button
                                        onClick={() => setCartOpen(false)}
                                        className="micro-label border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-colors"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    {cart.map((item) => (
                                        <motion.div
                                            key={item.product.id}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: 50 }}
                                            className="flex gap-6"
                                        >
                                            <div
                                                className="w-24 md:w-32 aspect-[4/5] bg-[#111] flex-shrink-0 cursor-pointer overflow-hidden"
                                                onClick={() => {
                                                    setCartOpen(false);
                                                    navigate(`/product/${item.product.id}`);
                                                }}
                                            >
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                                                    referrerPolicy="no-referrer"
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="font-serif text-xl italic">{item.product.name}</h3>
                                                    <button
                                                        onClick={() => removeFromCart(item.product.id)}
                                                        className="text-white/40 hover:text-white transition-colors p-1"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <p className="micro-label text-white/40 mb-4">{item.product.brand}</p>

                                                <div className="mt-auto flex justify-between items-end">
                                                    <div className="flex items-center gap-3 border border-white/10">
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                            className="p-2 hover:bg-white/5 transition-colors"
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="text-sm w-6 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                            className="p-2 hover:bg-white/5 transition-colors"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                    <p className="text-lg font-serif italic">${(item.product.price * item.quantity).toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="p-6 md:p-8 bg-[#0A0A0A] border-t border-white/10">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[10px] tracking-[0.2em] opacity-40 uppercase">Subtotal</span>
                                    <span className="text-xl font-serif italic">${subtotal.toLocaleString()}</span>
                                </div>
                                <p className="text-white/30 text-xs mb-6">Shipping and taxes calculated at checkout</p>
                                <button
                                    onClick={() => {
                                        setCartOpen(false);
                                        navigate('/checkout');
                                    }}
                                    className="w-full bg-[#C5A059] text-black py-4 text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-white transition-colors"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
