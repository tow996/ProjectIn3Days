import { useCallback, useContext, useState, type FC, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import { FaFacebook, FaInstagram, FaShoppingCart, FaTwitter } from "react-icons/fa";
import { UserContext } from "../store/UserContext";
import { apiUrl } from "../utils/url";
import { ToastContainer } from "react-toastify";

interface PageLayoutProps {
    children: ReactNode;
}

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { loggedIn, isAdmin, logOut } = useContext(UserContext);
    const handleLogOut = useCallback(() => {
        if(!logOut) return;
        logOut();
        navigate('/');
    }, [logOut, navigate]);
    return (
        <div className="page-layout">
            <header className="page-header">
                <nav>
                    <Link to='/'><h3 className='logo'><img src={logo} alt='Logo' />Nexus PC</h3></Link>
                    
                    <div className={`nav-toggle ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    <ul className={menuOpen ? 'nav-open' : ''}>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/build'>Build</Link></li>
                        <li><Link to='/store'>Store</Link></li>
                        <li><Link to='/contact'>Contact</Link></li>
                        {loggedIn ? (
                            <>
                                {isAdmin && <li><a href={`${apiUrl}/admin`} target='_blank'>Admin</a></li>}
                                <li><a onClick={handleLogOut} style={{cursor: 'pointer'}}>Logout</a></li>
                            </>
                        ) : (
                            <>
                                <li><Link to='/login'>Login</Link></li>
                                <li><Link to='/signup'>Sign Up</Link></li>
                            </>
                        )}
                        <li><Link to='/checkout'><FaShoppingCart /></Link></li>
                    </ul>
                </nav>
            </header>

            {children}
            <ToastContainer theme='dark' />
            <footer className="page-footer">
                <p>&copy; 2025 Nexus PC. All rights reserved.</p>
                <div className='socials'>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /> Facebook</a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /> Twitter</a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /> Instagram</a>
                </div>
            </footer>   
        </div>
    );
};

export default PageLayout;
