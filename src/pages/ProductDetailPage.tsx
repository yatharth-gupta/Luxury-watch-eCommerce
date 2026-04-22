import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ShoppingBag, Shield, RotateCcw, Truck } from 'lucide-react';
import { useAppContext } from '../context';
import { PRODUCTS } from '../data/watches';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useAppContext();

    const product = PRODUCTS.find(p => p.id === id);

    if (!product) {
        return (
            <div className="pt-32 pb-24 text-center min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-4xl font-serif italic mb-4">Timepiece Not Found</h1>
                <p className="text-white/40 mb-8">The requested timepiece could not be found in our collection.</p>
                <Link
                    to="/collections"
                    className="px-10 py-4 bg-[#C5A059] text-black text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-white transition-colors"
                >
                    Browse Collections
                </Link>
            </div>
        );
    }

    const relatedProducts = PRODUCTS.filter(p => p.id !== product.id && p.brand === product.brand).slice(0, 2);
    if (relatedProducts.length < 2) {
        const moreProducts = PRODUCTS.filter(p => p.id !== product.id && !relatedProducts.includes(p)).slice(0, 2 - relatedProducts.length);
        relatedProducts.push(...moreProducts);
    }

    const specs = [
        { label: 'Reference', value: product.reference },
        { label: 'Movement', value: product.movement },
        { label: 'Case Material', value: product.caseMaterial },
        { label: 'Water Resistance', value: '100m' },
        { label: 'Power Reserve', value: '72 Hours' },
        { label: 'Crystal', value: 'Sapphire' },
    ];

    return (
        <div className="pt-24 md:pt-28">
            {/* Breadcrumb */}
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-6">
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 text-sm text-white/40"
                >
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <span>/</span>
                    <Link to="/collections" className="hover:text-white transition-colors">Collections</Link>
                    <span>/</span>
                    <span className="text-white/60">{product.name}</span>
                </motion.div>
            </div>

            {/* Product hero section */}
            <section className="max-w-[1600px] mx-auto px-6 md:px-12 pb-16 md:pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="relative aspect-[4/5] bg-[#111] overflow-hidden group"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-6 left-6">
                            <span className="text-[9px] tracking-[0.3em] uppercase bg-[#C5A059] text-black px-3 py-1.5 font-bold">
                                {product.brand}
                            </span>
                        </div>
                    </motion.div>

                    {/* Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="flex flex-col justify-center"
                    >
                        <span className="text-[#C5A059] text-xs font-mono tracking-widest uppercase mb-4">{product.reference}</span>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif italic tracking-tighter mb-4 leading-[0.9]">
                            {product.name}
                        </h1>
                        <p className="text-white/30 text-xs tracking-[0.2em] uppercase mb-8">by {product.brand}</p>

                        <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-lg">
                            {product.description}
                        </p>

                        {/* Price */}
                        <div className="border-y border-white/10 py-6 mb-8">
                            <span className="text-4xl font-serif italic text-white">${product.price.toLocaleString()}</span>
                            <p className="text-white/30 text-xs mt-2 tracking-wide">Tax included. Free worldwide shipping.</p>
                        </div>

                        {/* Add to Cart */}
                        <button
                            onClick={() => addToCart(product)}
                            className="group w-full md:w-auto px-12 py-5 bg-[#C5A059] text-black text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-white transition-colors inline-flex items-center justify-center gap-3 mb-8"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            Add to Bag
                        </button>

                        {/* Service highlights */}
                        <div className="grid grid-cols-3 gap-4 pt-4">
                            <div className="text-center">
                                <Truck className="w-5 h-5 mx-auto mb-2 text-white/30" strokeWidth={1} />
                                <span className="text-[9px] tracking-[0.15em] uppercase text-white/30 block">Free Shipping</span>
                            </div>
                            <div className="text-center">
                                <Shield className="w-5 h-5 mx-auto mb-2 text-white/30" strokeWidth={1} />
                                <span className="text-[9px] tracking-[0.15em] uppercase text-white/30 block">5-Year Warranty</span>
                            </div>
                            <div className="text-center">
                                <RotateCcw className="w-5 h-5 mx-auto mb-2 text-white/30" strokeWidth={1} />
                                <span className="text-[9px] tracking-[0.15em] uppercase text-white/30 block">30-Day Returns</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Specifications */}
            <section className="border-y border-white/10">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-serif italic tracking-tighter mb-12">Specifications</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
                            {specs.map((spec, i) => (
                                <motion.div
                                    key={spec.label}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05, duration: 0.4 }}
                                    className="flex justify-between items-end py-4 border-b border-white/5"
                                >
                                    <span className="text-[10px] tracking-[0.2em] uppercase text-white/40">{spec.label}</span>
                                    <span className="text-sm font-light text-white/80">{spec.value}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-24">
                    <h2 className="text-3xl md:text-5xl font-serif italic tracking-tighter mb-12">You May Also Admire</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                        {relatedProducts.map((p, i) => (
                            <ProductCard key={p.id} product={p} index={i} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
