import React, { createContext, useState, useEffect } from 'react';

import { addItemToCart, removeItemFromCart, filerItemFromCart, getCartItemsCount, getCartTotal } from './cart.utils';

export const CartContext = createContext({
    hidden: true,
    toggleHidden: () => {},
    cartItems: [],
    addItem: () => {},
    removeItem: () => {},
    clearItemFromCart: () => {},
    cartItemsCount: 0,
    cartTotalPrice: 0,
});

const CartProvider = ({ children }) => {
    const [hidden, setHidden] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);
    
    const toggleHidden = () => setHidden(!hidden);
    const addItem = item => setCartItems(addItemToCart(cartItems, item));
    const removeItem = item => setCartItems(removeItemFromCart(cartItems, item));
    const clearItemFromCart = item => setCartItems(filerItemFromCart(cartItems, item));

    useEffect(() => {
        const data = localStorage.getItem('cartItems');
        if (data) {
            setCartItems(JSON.parse(data));
        }
    }, [])

    useEffect(() => {
        setCartItemsCount(getCartItemsCount(cartItems));
        setCartTotalPrice(getCartTotal(cartItems));
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems])

    return(
        <CartContext.Provider
           value={{
               hidden,
               toggleHidden,
               cartItems,
               addItem,
               removeItem,
               clearItemFromCart,
               cartItemsCount,
               cartTotalPrice,
           }} 
        >
            { children }
        </CartContext.Provider>

    )
};

export default CartProvider;