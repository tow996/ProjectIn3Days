import { Routes, Route, Outlet  } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Build from "./pages/Build";
import { UserContext } from "./store/UserContext";
import { useContext, type FC } from "react";
import NotFound from "./pages/NotFound";
import LoadingPage from "./pages/LoadingPage";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";
import Store from "./pages/Store";


const PublicRoutes: FC = () => <Outlet />;

const GuestOnlyRoutes: FC = () => {
    const { loggedIn, loading } = useContext(UserContext);
    if (loading) return <LoadingPage />;
    if (loggedIn) return <NotFound />
    return <Outlet />;
};

// const PrivateRoutes: FC = () => {
//     const { loggedIn, loading } = useContext(UserContext);
//     if (loading) return <LoadingPage />;
//     if (!loggedIn) return <NotFound />
//     return <Outlet />;
// };


const App = () => {
    return (
        <Routes>
            <Route element={<PublicRoutes />}>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/build" element={<Build />} />
                <Route path="/store" element={<Store />} />
                <Route path="/checkout" element={<Checkout />} />
            </Route>

            <Route element={<GuestOnlyRoutes />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default App;