import { useState, useCallback, type FC, useRef } from "react";
import { CartContext, type CartItem, type Product } from "./CartContext";
import api from "../api/axios";

const fetchCartData = async () => {
    const response = await api.get("/cart/view/");
    return response.data;
};

const addCartItemApi = async (product: Product, quantity: number = 1) => {
    return api.post("/cart/add/", { product, quantity });
};

const removeCartItemApi = async (productId: number) => {
    return api.post("/cart/remove/", { product_id: productId });
};

const deleteCartApi = async () => {
    return api.post("/cart/delete/");
};


export const CartProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>(() => {
        const storedCart = sessionStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    // Check if user is logged in once

    // Avoid race condition on multiple sync calls
    const isSyncingRef = useRef(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Sync local cart to server (used on login)
    const syncLocalCartToServer = useCallback(async () => {
        const localCart = sessionStorage.getItem("cart");
        const parsedCart: CartItem[] = localCart ? JSON.parse(localCart) : [];

        try {
            if (parsedCart.length === 0) {
                // Scenario 1: Empty sessionStorage cart, just fetch server cart
                const serverCart = await fetchCartData();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const formattedItems: CartItem[] = serverCart.cart.map((entry: any) => ({
                    item: entry.product,
                    quantity: entry.quantity,
                }));
                setItems(formattedItems);
                sessionStorage.setItem("cart", JSON.stringify(formattedItems)); // keep session updated
            } else {
                // Scenario 2: Non-empty sessionStorage cart: delete and upload
                if (isSyncingRef.current) return;
                isSyncingRef.current = true;

                await deleteCartApi();

                for (const cartItem of parsedCart) {
                    await addCartItemApi(cartItem.item, cartItem.quantity);
                }

                const serverCart = await fetchCartData();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const formattedItems: CartItem[] = serverCart.cart.map((entry: any) => ({
                    item: entry.product,
                    quantity: entry.quantity,
                }));
                setItems(formattedItems);
                sessionStorage.setItem("cart", JSON.stringify(formattedItems)); // keep session updated

                isSyncingRef.current = false;
            }
        } catch (error) {
            console.error("Failed to sync local cart to server:", error);
            isSyncingRef.current = false;
        }
    }, []);

    const fetchAndSetCart = useCallback(async () => {
        try {
            const data = await fetchCartData();
            if (data?.cart) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const formattedItems: CartItem[] = data.cart.map((entry: any) => ({
                    item: entry.product,
                    quantity: entry.quantity,
                }));
                setItems(formattedItems);
                sessionStorage.setItem("cart", JSON.stringify(formattedItems)); // keep session up-to-date
            }
        } catch (error) {
            console.error("Failed to fetch server cart:", error);
        }
    }, []);

    const addItem = useCallback((cartItemToAdd: Product) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find(item => item.item.id === cartItemToAdd.id);
            let newItems;
            if (existingItem) {
                newItems = prevItems.map(item =>
                    item.item.id === cartItemToAdd.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                newItems = [...prevItems, { item: cartItemToAdd, quantity: 1 }];
            }
            sessionStorage.setItem("cart", JSON.stringify(newItems));
            return newItems;
        });
        if (isLoggedIn)
            addCartItemApi(cartItemToAdd).catch(error =>
                console.error("Failed to add item to server cart:", error)
            );
    }, [isLoggedIn]);

    const removeItem = useCallback((itemId: number) => {
        const itemToRemove = items.find(item => item.item.id === itemId);
        const newItems = items.filter(item => item.item.id !== itemId);
        setItems(newItems);
        sessionStorage.setItem("cart", JSON.stringify(newItems));

        if (isLoggedIn && itemToRemove) {
            removeCartItemApi(itemId).catch(error =>
                console.error("Failed to remove item from server cart:", error)
            );
        }
    }, [items, isLoggedIn]);

    const increaseItemQuantity = useCallback((itemId: number) => {
        const newItems = items.map(item =>
            item.item.id === itemId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        setItems(newItems);
        sessionStorage.setItem("cart", JSON.stringify(newItems));

        const item = items.find(i => i.item.id === itemId);
        if (item) {
            addCartItemApi(item.item, 1).catch(error =>
                console.error("Failed to increase quantity on server:", error)
            );
        }
    }, [items]);

    const decreaseItemQuantity = useCallback((itemId: number) => {
        const item = items.find(i => i.item.id === itemId);
        if (!item || item.quantity <= 1) return;

        const newItems = items.map(i =>
            i.item.id === itemId
                ? { ...i, quantity: i.quantity - 1 }
                : i
        );
        setItems(newItems);
        sessionStorage.setItem("cart", JSON.stringify(newItems));
    }, [items]);

    const clearCart = useCallback(() => {
        setItems([]);
        sessionStorage.removeItem("cart");
        if (isLoggedIn) {
            deleteCartApi().catch(error =>
                console.error("Failed to clear server cart:", error)
            );
        }
    }, [isLoggedIn]);

    const clearCartOnlyLocal = useCallback(() => {
        setItems([]);
        sessionStorage.removeItem("cart");
    }, []);

    const syncAuthStatus = useCallback((status: boolean) => {
        setIsLoggedIn(status);
    }, []);        

    return (
        <CartContext.Provider
            value={{
                items,
                fetchAndSetCart,
                syncLocalCartToServer,
                addItem,
                removeItem,
                increaseItemQuantity,
                decreaseItemQuantity,
                clearCart,
                syncAuthStatus,
                clearCartOnlyLocal
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
