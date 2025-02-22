import { useContext, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for the mobile menu toggle

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [language, setLanguage] = useState('en'); // State to manage language selection
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false); // State to control language dropdown visibility
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to control mobile menu visibility

    // Toggle language dropdown visibility
    const toggleLanguageDropdown = () => {
        setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    };

    // Language selection handler
    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        setIsLanguageDropdownOpen(false); // Close dropdown after selecting language
    };

    // Toggle mobile menu visibility
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="navbar sticky top-0 z-50 backdrop-blur-lg bg-base-100/90 shadow-lg">
            {/* Navbar Start (Logo) */}
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost normal-case text-xl text-primary">
                    TaskFlow
                </Link>
            </div>

            {/* Navbar Center (Desktop Links) */}
            <div className="navbar-center hidden lg:flex gap-4">
                <Link to="/" className="btn btn-ghost text-lg hover:text-primary">
                    Home
                </Link>
                <Link to="/add-task" className="btn btn-ghost text-lg hover:text-primary">
                    Add Task
                </Link>
            </div>

            {/* Navbar End (Language Dropdown and User Menu) */}
            <div className="navbar-end space-x-3">
                {/* Language Dropdown */}
                <div className="dropdown dropdown-end hidden lg:block">
                    <button
                        tabIndex={0}
                        className="btn btn-ghost"
                        onClick={toggleLanguageDropdown}
                    >
                        Language: {language === 'en' ? 'English' : 'Spanish'}
                    </button>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
                    >
                        <li>
                            <button onClick={() => handleLanguageChange('en')}>English</button>
                        </li>
                        <li>
                            <button onClick={() => handleLanguageChange('es')}>Spanish</button>
                        </li>
                    </ul>
                </div>

                {/* User Menu */}
                {user && user?.email ? (
                    <button onClick={logOut} className="btn btn-primary btn-sm hidden lg:block">
                        Logout
                    </button>
                ) : (
                    <Link to="/auth/login" className="btn btn-primary btn-sm hidden lg:block">
                        Login
                    </Link>
                )}

                {/* Mobile Menu Toggle Button */}
                <div className="lg:hidden">
                    <button onClick={toggleMobileMenu} className="btn btn-ghost">
                        {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="lg:hidden absolute top-16 right-0 w-full bg-base-100 shadow-lg">
                    <ul className="menu p-4 space-y-2">
                        <li>
                            <Link to="/" className="btn btn-ghost w-full justify-start" onClick={toggleMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/add-task" className="btn btn-ghost w-full justify-start" onClick={toggleMobileMenu}>
                                Add Task
                            </Link>
                        </li>
                        <li>
                            <div className="dropdown dropdown-end">
                                <button
                                    tabIndex={0}
                                    className="btn btn-ghost w-full justify-start"
                                    onClick={toggleLanguageDropdown}
                                >
                                    Language: {language === 'en' ? 'English' : 'Spanish'}
                                </button>
                                {isLanguageDropdownOpen && (
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40"
                                    >
                                        <li>
                                            <button onClick={() => handleLanguageChange('en')}>English</button>
                                        </li>
                                        <li>
                                            <button onClick={() => handleLanguageChange('es')}>Spanish</button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </li>
                        <li>
                            {user && user?.email ? (
                                <button onClick={logOut} className="btn btn-ghost w-full justify-start">
                                    Logout
                                </button>
                            ) : (
                                <Link to="/auth/login" className="btn btn-ghost w-full justify-start" onClick={toggleMobileMenu}>
                                    Login
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;