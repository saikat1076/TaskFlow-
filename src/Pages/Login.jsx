import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';

const Login = () => {
    const { handleGoogleLogin, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // Handle Google Login
    const handleGoogleLoginClick = async () => {
        try {
            const res = await handleGoogleLogin();
            const user = res.user;

            // Include Firebase UID in the userData object
            const userData = {
                userId: user.uid, // Firebase UID
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                role: 'user',
            };

            // Send data to backend using Axios (prevents duplicate users)
            const response = await axios.post('https://task-flow-server-peach.vercel.app/users', userData);

            if (response.status === 201 || response.status === 200) {
                setUser(user);
                toast.success("Logged in successfully with Google!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                navigate('/');
            } else {
                toast.error("Unexpected error occurred!", {
                    position: "top-center",
                    autoClose: 3000,
                });
            }
        } catch (error) {
            toast.error(`Error with Google login: ${error.message}`, {
                position: "top-center",
                autoClose: 3000,
            });
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg')" }}>

            {/* Welcome Message */}
            <h1 className="text-white text-5xl font-bold mb-8 text-center shadow-lg bg-black bg-opacity-50 px-8 py-4 rounded-lg">
                Welcome to <span className="text-purple-400">TaskFlow</span>
            </h1>

            {/* Login Card */}
            <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg w-full max-w-md text-center transform transition-transform hover:scale-105">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Login to Your Account</h2>

                {/* Google Login Button */}
                <button
                    onClick={handleGoogleLoginClick}
                    className="w-full flex items-center justify-center gap-3 bg-black text-white px-4 py-3 rounded-lg shadow-md hover:bg-gray-800 transition hover:shadow-lg">
                    <FcGoogle className="text-2xl" />
                    <span className="text-lg font-semibold">Login with Google</span>
                </button>
            </div>

            {/* Toast Container */}
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default Login;