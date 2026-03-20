'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of a Cart Item
export interface CartItem {
    id: string;      // Sport ID (e.g., 'football-boys')
    cartItemId: string; // Unique instance ID in cart
    name: string;    // Sport Name
    category: string;// 'boys' | 'girls' | 'open'
    price: number;   // Numeric price
    color?: string;  // For UI emphasis
    image?: string;  // Background image
    pricingType?: 'person' | 'team';
}

// Define the Context Shape
interface CartContextType {
    items: CartItem[];
    isOpen: boolean;
    addToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
    removeFromCart: (cartItemId: string) => void;
    toggleCart: () => void;
    setCart: (items: CartItem[]) => void;
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

    const addToCart = (newItem: Omit<CartItem, 'cartItemId'>) => {
        setItems(prev => {
            const itemWithId: CartItem = {
                ...newItem,
                cartItemId: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
            };
            return [...prev, itemWithId];
        });
        setIsOpen(true); // Auto-open cart on add
    };

    const removeFromCart = (cartItemId: string) => {
        setItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
    };

    const toggleCart = () => setIsOpen(prev => !prev);

    // Allow external updates (e.g. from draft restore)
    const setCart = (newItems: CartItem[]) => {
        setItems(newItems);
    };

    const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <CartContext.Provider value={{ items, isOpen, addToCart, removeFromCart, toggleCart, setCart, totalAmount }}>
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
