import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    return (
        <nav className='flex justify-between items-center px-[140px] bg-[#1C2B35] text-white h-20'>
            <h2>Online Shopping</h2>
            <div className='menu'>
                <Link className='mr-3 hover:text-orange-300' to="/">Shop</Link>
                <Link className='mr-3 hover:text-orange-300' to="/orders">Orders</Link>
                <Link className='mr-3 hover:text-orange-300' to="/inventory">Inventory</Link>
                <Link className='mr-3 hover:text-orange-300' to="/about">About</Link>
                {
                    user?.uid ?
                        <button className='btn-logout hover:text-orange-300' onClick={logOut}>Log out</button>
                        :
                        <>
                            <Link className='mr-3 hover:text-orange-300' to="/login">Login</Link>
                            <Link className='mr-3 hover:text-orange-300' to="/signup">Sign up</Link>
                        </>
                }
            </div>
        </nav>
    );
};

export default Navbar;