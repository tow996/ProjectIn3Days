import { type FC, type ReactNode } from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className='auth-layout'>
            <section className='auth-layout-form'>
                <Link to='/'><h3 className='logo'><img src={logo} alt='Logo' />Nexus PC</h3></Link>
                <Link to='/'><div className='exit'>X</div></Link>
                {children}
            </section>
            <ToastContainer />
        </div>
    )
}

export default AuthLayout