
import { Outlet } from 'react-router-dom';

const AuthLayouts = () => {
    return (
        <div className='lg:px-10'>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayouts; 