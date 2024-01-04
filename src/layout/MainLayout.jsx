import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function MainLayout() {
    return (
        <div className='w-full'>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout