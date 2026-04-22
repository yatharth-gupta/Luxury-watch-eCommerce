import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context';
import { Product } from '../data/watches';

const ProductCard: React.FC<{ product: Product; index?: number }> = ({ product, index = 0 }) => {
    const { addToCart } = useAppContext();
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className="group cursor-pointer flex flex-col"
            onClick={() => navigate(`/product/${product.id}`)}
        >
            <div className="relative aspect-[4/5] bg-[#111] overflow-hidden mb-6">
                <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover opacity-80 transition-opacity duration-700 ease-out"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                    referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                {/* Quick Add Button Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                        }}
                        className="w-full bg-[#C5A059] text-black py-4 text-[10px] tracking-[0.3em] font-bold uppercase hover:bg-white transition-colors"
                    >
                        Acquire — ${product.price.toLocaleString()}
                    </button>
                </div>
            </div>

            <div className="flex flex-col flex-grow">
                <span className="text-[10px] tracking-[0.2em] opacity-40 uppercase mb-2">{product.brand}</span>
                <div className="flex justify-between items-start mt-1">
                    <h3 className="text-xl font-serif italic group-hover:text-white/80 transition-colors">{product.name}</h3>
                </div>
                <div className="w-full h-px bg-white/10 mt-4 mb-2"></div>
                <span className="text-[10px] tracking-[0.2em] text-[#C5A059] mt-auto uppercase group-hover:tracking-[0.4em] transition-all duration-300">Explore Story</span>
            </div>
        </motion.div>
    );
};

export default ProductCard;
