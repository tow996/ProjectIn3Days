import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './styles/main.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserProvider } from "./store/UserProvider";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./store/CartProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <CartProvider>
                <UserProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </UserProvider>
            </CartProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
