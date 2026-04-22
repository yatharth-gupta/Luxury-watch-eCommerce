export interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    image: string;
    description: string;
    reference: string;
    movement: string;
    caseMaterial: string;
}

export const PRODUCTS: Product[] = [
    {
        id: 'p1',
        name: 'Chronographe Royal',
        brand: 'Aethelgard',
        price: 34500,
        image: `${import.meta.env.BASE_URL}data/images/watch1.jpg`,
        description: 'A masterpiece of horological engineering featuring a split-seconds chronograph and perpetual calendar. Hand-finished movement with over 400 components.',
        reference: 'REF. 8920-CR',
        movement: 'Manual Winding Calibre 452',
        caseMaterial: '18K Rose Gold'
    },
    {
        id: 'p2',
        name: 'Oceanic Perpetual',
        brand: 'Vanguard',
        price: 18200,
        image: `${import.meta.env.BASE_URL}data/images/watch2.jpg`,
        description: 'Designed for the depths, crafted for the surface. The Oceanic Perpetual features a helium escape valve and an in-house automatic movement immune to magnetic fields.',
        reference: 'REF. OP-441',
        movement: 'Automatic Calibre V-98',
        caseMaterial: 'Grade 5 Titanium'
    },
    {
        id: 'p3',
        name: 'Tourbillon Squelette',
        brand: 'Lumina',
        price: 85000,
        image: `${import.meta.env.BASE_URL}data/images/watch3.jpg`,
        description: 'An open-worked tourbillon that pushes the boundaries of transparency. Every bridge and plate is skeletonized by hand, requiring over 200 hours of craftsmanship.',
        reference: 'REF. TS-01-SK',
        movement: 'Flying Tourbillon Calibre 100',
        caseMaterial: 'Sapphire Crystal'
    },
    {
        id: 'p4',
        name: 'Classic Moonphase',
        brand: 'Aethelgard',
        price: 24000,
        image: `${import.meta.env.BASE_URL}data/images/watch4.jpg`,
        description: 'Elegant simplicity meets astronomical precision. The classic moonphase displays the lunar cycle with an accuracy of one day every 122 years.',
        reference: 'REF. 4022-CM',
        movement: 'Automatic Calibre 320-MP',
        caseMaterial: 'Platinum'
    },
    {
        id: 'p5',
        name: 'Aviator GMT',
        brand: 'Vanguard',
        price: 12500,
        image: `${import.meta.env.BASE_URL}data/images/watch5.jpg`,
        description: 'The ultimate traveler\'s watch. Tracks up to three different time zones simultaneously with its rotatable 24-hour bezel and independent GMT hand.',
        reference: 'REF. AV-GMT-22',
        movement: 'Automatic Calibre V-GMT',
        caseMaterial: 'Stainless Steel'
    },
    {
        id: 'p6',
        name: 'Minimalist Ultra-Thin',
        brand: 'Lumina',
        price: 15400,
        image: `${import.meta.env.BASE_URL}data/images/watch6.jpg`,
        description: 'A statement of supreme elegance. At just 4.3mm thick, it houses one of the world\'s thinnest mechanical movements without compromising reliability.',
        reference: 'REF. MUT-38',
        movement: 'Manual Winding Calibre 88',
        caseMaterial: '18K White Gold'
    }
];
