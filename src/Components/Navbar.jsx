import { useContext, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Link } from 'react-router-dom';


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [language, setLanguage] = useState('en'); // State to manage language selection
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false); // State to control dropdown visibility

    // Toggle language dropdown visibility
    const toggleLanguageDropdown = () => {
        setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    };

    // Language selection handler
    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        setIsLanguageDropdownOpen(false); // Close dropdown after selecting language
    };

    return (
        <div className="navbar sticky top-0 z-50 backdrop-blur-lg lg:px-5 glass shadow-lg bg-black place-items-center">
            <div className="navbar-start">
                <div className='flex gap-2'>
                    <h2 className='text-white font-bold text-xl'>TaskFlow</h2>
                </div>
            </div>

            <div className="navbar-center gap-4">
                <Link to="/" className="text-white font-bold text-lg hover:text-amber-300">Home</Link>
                <Link to="/add-task" className="text-white font-bold text-lg hover:text-amber-300">Add Task</Link>
            </div>

            <div className="navbar-end space-x-3">
                {/* Language Dropdown with toggle */}
                <div className="relative">
                    <button className="btn btn-ghost text-white" onClick={toggleLanguageDropdown}>
                        Language: {language === 'en' ? 'English' : 'Spanish'}
                    </button>
                    {isLanguageDropdownOpen && (
                        <ul className="menu menu-sm dropdown-content bg-black rounded-box z-[1] mt-3 w-40 p-2 shadow absolute right-0">
                            <li>
                                <button onClick={() => handleLanguageChange('en')} className="text-white">English</button>
                            </li>
                            <li>
                                <button onClick={() => handleLanguageChange('es')} className="text-white">Spanish</button>
                            </li>
                        </ul>
                    )}
                </div>

                {/* User Menu */}
                {user && user?.email ? (
                    <button onClick={logOut} className="btn btn-sm bg-[#87d6e1] text-white text-sm">Logout</button>
                ) : (
                    <Link to="/auth/login" className="btn btn-sm bg-[#87d6e1] text-white text-sm">Login</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
