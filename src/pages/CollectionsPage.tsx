import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/watches';

const BRANDS = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.brand)))];

const PRICE_RANGES = [
    { label: 'All Prices', min: 0, max: Infinity },
    { label: 'Under $15,000', min: 0, max: 15000 },
    { label: '$15,000 — $30,000', min: 15000, max: 30000 },
    { label: '$30,000 — $60,000', min: 30000, max: 60000 },
    { label: 'Over $60,000', min: 60000, max: Infinity },
];

const SORT_OPTIONS = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Name: A-Z', value: 'name-asc' },
];

export default function CollectionsPage() {
    const [searchParams] = useSearchParams();
    const initialBrand = searchParams.get('brand') || 'All';

    const [selectedBrand, setSelectedBrand] = useState(initialBrand);
    const [selectedPriceRange, setSelectedPriceRange] = useState(0);
    const [sortBy, setSortBy] = useState('featured');
    const [showFilters, setShowFilters] = useState(false);

    const filtered = useMemo(() => {
        let result = [...PRODUCTS];

        if (selectedBrand !== 'All') {
            result = result.filter(p => p.brand === selectedBrand);
        }

        const range = PRICE_RANGES[selectedPriceRange];
        result = result.filter(p => p.price >= range.min && p.price < range.max);

        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        return result;
    }, [selectedBrand, selectedPriceRange, sortBy]);

    const hasActiveFilters = selectedBrand !== 'All' || selectedPriceRange !== 0;

    return (
        <div className="pt-24 md:pt-32">
            {/* Hero banner */}
            <section className="max-w-[1600px] mx-auto px-6 md:px-12 mb-12 md:mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-[#C5A059] text-xs font-mono tracking-widest uppercase mb-6 block">The Collection</span>
                    <h1 className="text-5xl md:text-7xl lg:text-[100px] leading-[0.85] font-serif italic tracking-tighter mb-6">
                        All Timepieces
                    </h1>
                    <p className="text-white/40 text-sm tracking-wide max-w-lg leading-relaxed">
                        Explore our complete collection of exceptional mechanical timepieces, each one a statement of unparalleled artistry.
                    </p>
                </motion.div>
            </section>

            {/* Filters bar */}
            <section className="max-w-[1600px] mx-auto px-6 md:px-12 mb-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-y border-white/10 py-6">
                    {/* Brand filter pills */}
                    <div className="flex flex-wrap gap-2">
                        {BRANDS.map((brand) => (
                            <button
                                key={brand}
                                onClick={() => setSelectedBrand(brand)}
                                className={`px-5 py-2 text-[10px] tracking-[0.2em] uppercase transition-all duration-300 border ${selectedBrand === brand
                                        ? 'bg-[#C5A059] text-black border-[#C5A059]'
                                        : 'border-white/10 text-white/60 hover:border-white/30'
                                    }`}
                            >
                                {brand}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        {hasActiveFilters && (
                            <button
                                onClick={() => { setSelectedBrand('All'); setSelectedPriceRange(0); }}
                                className="flex items-center gap-1 text-[#C5A059] text-xs hover:text-white transition-colors"
                            >
                                <X className="w-3 h-3" /> Clear
                            </button>
                        )}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 micro-label hover:text-[#C5A059] transition-colors"
                        >
                            <SlidersHorizontal className="w-4 h-4" /> Filters
                        </button>
                    </div>
                </div>

                {/* Expandable filters */}
                {showFilters && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-b border-white/10 py-6 grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        <div>
                            <label className="micro-label mb-4 block">Price Range</label>
                            <div className="flex flex-wrap gap-2">
                                {PRICE_RANGES.map((range, i) => (
                                    <button
                                        key={range.label}
                                        onClick={() => setSelectedPriceRange(i)}
                                        className={`px-4 py-2 text-xs transition-all border ${selectedPriceRange === i
                                                ? 'bg-[#C5A059] text-black border-[#C5A059]'
                                                : 'border-white/10 text-white/60 hover:border-white/30'
                                            }`}
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="micro-label mb-4 block">Sort By</label>
                            <div className="flex flex-wrap gap-2">
                                {SORT_OPTIONS.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => setSortBy(option.value)}
                                        className={`px-4 py-2 text-xs transition-all border ${sortBy === option.value
                                                ? 'bg-[#C5A059] text-black border-[#C5A059]'
                                                : 'border-white/10 text-white/60 hover:border-white/30'
                                            }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </section>

            {/* Results count */}
            <section className="max-w-[1600px] mx-auto px-6 md:px-12 mb-8">
                <p className="text-white/30 text-sm">{filtered.length} timepiece{filtered.length !== 1 ? 's' : ''}</p>
            </section>

            {/* Product grid */}
            <section className="max-w-[1600px] mx-auto px-6 md:px-12 pb-24">
                {filtered.length === 0 ? (
                    <div className="text-center py-24">
                        <p className="text-white/40 text-lg font-serif italic mb-4">No timepieces match your criteria</p>
                        <button
                            onClick={() => { setSelectedBrand('All'); setSelectedPriceRange(0); }}
                            className="micro-label border border-white/20 px-8 py-4 hover:bg-white hover:text-black transition-colors"
                        >
                            Clear All Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {filtered.map((product, i) => (
                            <ProductCard key={product.id} product={product} index={i} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
