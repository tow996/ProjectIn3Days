import { createContext } from "react";
import type { PCBuild } from "../types/builder";
import type { Peripheral } from "../types/peripheral";

export type Product = Peripheral | PCBuild;

export type CartItem = {
    item: Peripheral | PCBuild,
    quantity: number,
}

export interface CartContextType {
    items: CartItem[];
    fetchAndSetCart: () => Promise<void>;
    syncLocalCartToServer: () => Promise<void>;
    addItem: (item: Product) => void;
    removeItem: (id: number) => void;
    increaseItemQuantity: (id: number) => void;
    decreaseItemQuantity: (id: number) => void;
    clearCart: () => void;
    syncAuthStatus: (status: boolean) => void;
    clearCartOnlyLocal: () => void;
}


export const CartContext = createContext<CartContextType>({
    items: [],
    fetchAndSetCart: async () => {},
    addItem: () => {},
    increaseItemQuantity: () => {},
    decreaseItemQuantity: () => {},
    removeItem: () => {},
    syncLocalCartToServer: async () => {},
    clearCart: () => {},
    syncAuthStatus: () => {},
    clearCartOnlyLocal: () => {},
});