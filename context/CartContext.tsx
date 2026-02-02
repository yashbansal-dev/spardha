'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of a Cart Item
export interface CartItem {
    id: string;      // Unique ID (e.g., 'football-boys', 'cricket-leather-boys')
    name: string;    // Sport Name
    category: string;// 'boys' | 'girls' | 'open'
    price: number;   // Numeric price
    color: string;   // For UI emphasis
}

// Define the Context Shape
interface CartContextType {
    items: CartItem[];
    isOpen: boolean;
    addToCart: (item: CartItem) => void;
    removeFromCart: (itemId: string) => void;
    toggleCart: () => void;
    totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('spardha-cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('spardha-cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (newItem: CartItem) => {
        setItems(prev => {
            // Prevent duplicates
            if (prev.some(item => item.id === newItem.id)) return prev;
            return [...prev, newItem];
        });
        setIsOpen(true); // Auto-open cart on add
    };

    const removeFromCart = (itemId: string) => {
        setItems(prev => prev.filter(item => item.id !== itemId));
    };

    const toggleCart = () => setIsOpen(prev => !prev);

    const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <CartContext.Provider value={{ items, isOpen, addToCart, removeFromCart, toggleCart, totalAmount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
