import { useContext, useEffect, useState, type FC } from "react";
import { UserContext } from "./UserContext";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { CartContext } from "./CartContext";

const handleFetchData = async () => {
    const response = await api.get('/me');
    return response.data;
};

const handleLogOutUser = async () => {
    const response = await api.get('/logout'); 
    return response.data;
};

export const UserProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const { fetchAndSetCart, clearCartOnlyLocal, syncLocalCartToServer, syncAuthStatus } = useContext(CartContext);
    const [firstLoad, setFirstLoad] = useState(true);

    const { data, isSuccess, isError, isLoading, refetch } = useQuery({
        queryKey: ["user-info"],
        queryFn: handleFetchData,
        refetchOnWindowFocus: false,
        retry: false,
    });

    useEffect(() => {
        if (isSuccess && data) {
            setLoggedIn(true);
            setIsAdmin(data.isAdmin ?? false);
        } else if (isError) {
            setLoggedIn(false);
            setIsAdmin(false);
        }
        if (firstLoad && loggedIn) {
            setFirstLoad(false);
            fetchAndSetCart();
        }
    }, [data, isSuccess, isError, loggedIn, fetchAndSetCart, firstLoad]);

    const logOut = async () => {
        try {
            
            await handleLogOutUser(); 
            setLoggedIn(false);
            setIsAdmin(false);
            syncAuthStatus(false); 
            clearCartOnlyLocal();
            await refetch();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    const updateUserInfo = async () => {
        syncAuthStatus(true)
        await refetch();                  
        await syncLocalCartToServer();    
        await fetchAndSetCart();          
    };

    const contextValue = {
        loggedIn,
        isAdmin,
        loading: isLoading,
        updateUserInfo,
        logOut,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};
