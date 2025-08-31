import { createContext } from "react";

type UserContextType = {
    loggedIn: boolean;
    isAdmin: boolean;
    loading: boolean; 
    updateUserInfo: () => void;
    logOut?: () => void;
};

export const UserContext = createContext<UserContextType>({
    loggedIn: false,
    isAdmin: false,
    loading: false,
    updateUserInfo: () => {},
    logOut: () => {},
});