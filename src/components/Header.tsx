import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, Search } from 'lucide-react';
import { useAppContext } from '../context';
import MobileNav from './MobileNav';
import SearchOverlay from './SearchOverlay';

export default function Header() {
    const { cart, setCartOpen } = useAppContext();
    const [scrolled, setScrolled] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile nav on route change
    useEffect(() => {
        setMobileNavOpen(false);
    }, [location.pathname]);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Determine if page has transparent hero (home page)
    const isHome = location.pathname === '/';
    const headerBg = scrolled || !isHome
        ? 'bg-[#050505]/95 backdrop-blur-lg border-b border-white/10 shadow-xl'
        : 'bg-transparent border-b border-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]';

    return (
        <>
            <header className={`fixed top-0 w-full z-40 transition-all duration-500 ease-out ${headerBg}`}>
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 md:h-24 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <button
                            onClick={() => setMobileNavOpen(true)}
                            className="text-white hover:opacity-70 transition-opacity"
                            aria-label="Open menu"
                        >
                            <Menu className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1} />
                        </button>
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="hidden md:block text-white hover:opacity-70 transition-opacity"
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5" strokeWidth={1} />
                        </button>
                    </div>

                    {/* Desktop nav links */}
                    <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                        <Link
                            to="/collections"
                            className="micro-label hover:text-[#C5A059] transition-colors"
                        >
                            Collections
                        </Link>
                        <Link to="/" className="text-2xl md:text-3xl tracking-[0.5em] font-serif font-light italic uppercase hover:opacity-80 transition-opacity">
                            AETHELGARD
                        </Link>
                        <Link
                            to="/about"
                            className="micro-label hover:text-[#C5A059] transition-colors"
                        >
                            Heritage
                        </Link>
                    </nav>

                    {/* Mobile logo (shown when desktop nav hidden) */}
                    <Link to="/" className="lg:hidden absolute left-1/2 -translate-x-1/2">
                        <span className="text-xl md:text-2xl tracking-[0.4em] font-serif font-light italic uppercase">AETHELGARD</span>
                    </Link>

                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="md:hidden text-white hover:opacity-70 transition-opacity"
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5" strokeWidth={1} />
                        </button>
                        <Link
                            to="/contact"
                            className="hidden md:block micro-label hover:text-[#C5A059] transition-colors"
                        >
                            Contact
                        </Link>
                        <button
                            onClick={() => setCartOpen(true)}
                            className="flex items-center gap-2 text-white hover:opacity-70 transition-opacity relative"
                        >
                            <span className="hidden md:block micro-label">Cart</span>
                            <div className="relative">
                                <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1} />
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-3 bg-[#C5A059] text-black text-[10px] px-1.5 py-0.5 flex items-center justify-center rounded-full font-bold">
                                        {totalItems}
                                    </span>
                                )}
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
            <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
}
