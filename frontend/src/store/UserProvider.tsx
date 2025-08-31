import { useEffect, useState, type FC } from "react";
import { UserContext } from "./UserContext";
import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

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
    }, [data, isSuccess, isError]);

    const logOut = async () => {
        try {
            await handleLogOutUser();
            setLoggedIn(false);
            setIsAdmin(false);
            await refetch();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const contextValue = {
        loggedIn,
        isAdmin,
        loading: isLoading,
        updateUserInfo: refetch,
        logOut,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};
