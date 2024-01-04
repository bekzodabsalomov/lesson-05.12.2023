import useLogout from '../hooks/useLogout';
import { Link, NavLink } from 'react-router-dom';
import { useGlobalContext } from './../hooks/useGlobalContext';

function Navbar() {
    const { user } = useGlobalContext();
    const { logout, error } = useLogout();

    if (error) {
        alert("Log out error");
    }

    return (
        <div className='flex items-center justify-between bg-blue-500 p-4 nav'> 
            <Link to="/" className='text-2xl text-white'>My Book</Link> 
            <nav className='flex items-center gap-[10px]'>
            </nav>
            <div className='flex items-center gap-4'>
                <p className='text-xs bg-green-300 px-2 py-1 rounded text-black'>
                    Welcome <span className='font-bold'>{user.displayName}</span> !
                </p>
                <button onClick={logout} className="bg-red-500 logout hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-[10px]"> 
                    Log out
                </button>
            </div>
        </div>
    );
}

export default Navbar;