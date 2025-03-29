import React, { useState, useContext } from "react";
import backgroundImage from "../../public/SynergiserBackground.png"
import { useNavigate, useLocation } from 'react-router-dom'
import { useFirebaseAuthContext } from "../Contexts/auth-context";
import { ModelContext } from '../Contexts/Context';
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const {setUserProfile} = useContext(ModelContext);
    const { googleLogin, googleLogout } = useFirebaseAuthContext();
    const errorMsg = location.state?.errorMessage;

    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
    };

    const API_BASE_URL = "http://127.0.0.1:8000";

    const getUserId = async (email) => {
        const response = await axios.post(`${API_BASE_URL}/account_check_v2?email_id=${email}`);
        return response.data.user_id;
    };

    const getUserProfile = async (userId) => {
        const response = await axios.get(`${API_BASE_URL}/get_user_profile?user_id=${userId}`);
        return response.data.user_data;
    };
    
    const isProfileIncomplete = (userData) => {
        const requiredFields = ["company_name", "company_description", "company_feature_name_one", "company_feature_description_one"];
        return requiredFields.some(field => !userData[field]);
    };

    const checkUserData = async (response) => {
        try {
            const userId = await getUserId(response.user.email);
            localStorage.setItem("user_id", JSON.stringify(userId));
    
            const userData = await getUserProfile(userId);
    
            if (!userData) {
                return {
                    proceedToMainPageFlag: false,
                    incompleteProfileMessage: `It looks like you're a new user. Please fill out all the required information below.
                                               Once finished, press 'Submit Info' and then 'Proceed to Brainstorm' to start generating partnerships!`
                };
            }
    
            setUserProfile({ ...userData });
    
            if (isProfileIncomplete(userData)) {
                return {
                    proceedToMainPageFlag: false,
                    incompleteProfileMessage: `It looks like your profile is incomplete. Please fill in all required fields to begin your partnership creation journey.
                                               Once provided, press 'Submit Info' and then 'Proceed to Brainstorm' to start generating partnerships!`
                };
            }
    
            return { proceedToMainPageFlag: true, incompleteProfileMessage: "" };
    
        } catch (error) {
            console.error("Error checking user data:", error);
            return { proceedToMainPageFlag: false, incompleteProfileMessage: "An error occurred while verifying your profile." };
        }
    };


    const handleLogin = async () => {
        try {
            setLoading(true);
            const googleResponse = await googleLogin();
    
            const { proceedToMainPageFlag, incompleteProfileMessage } = await checkUserData(googleResponse);
    
            if (proceedToMainPageFlag) {
                navigate('/main');
            } else {
                navigate('/profile-incomplete', { state: { message: incompleteProfileMessage } });
            }
        } catch (err) {
            console.error("Login failed:", err);
            toast.error("Failed to login. Please try again.");
            await googleLogout();
            localStorage.clear();
        } finally {
            setLoading(false);
        }
    };

    const handleReturnToLandingButton = () => {
        navigate('/');
    }

    return (
        <div style={backgroundStyle} className="flex items-center justify-center min-h-screen ">
            {errorMsg && (
                <div className="absolute top-0 left-0 w-full p-6 rounded bg-red-500 text-white">
                    {errorMsg}
                </div>
            )}
            <div className={`block p-6 bg-white border border-gray-200 rounded-lg whitespace-no-wrap ${loading ? "opacity-20" : "opacity-100"}`}>
                <h1 className="text-center text-3xl font-bold mb-4 whitespace-no-wrap">Welcome to Synergizer AI!</h1>
                <p className="text-center text-gray-600 whitespace-no-wrap">To proceed, please sign in using Google</p>
                <p className="text-center text-gray-600 whitespace-no-wrap">So then you can start generating potential partnerships and more today!</p>
                <div className="mt-8 pb-10">
                    <button onClick={handleLogin} className="bg-orange-500 text-white py-3 rounded-full w-3/4 mx-auto block mb-4">
                        <i className="fa-brands fa-google mr-2"></i>Log-in with Google
                    </button>
                </div>
                <div className="flex justify-center text-orange-500 text-sm">
                    <button onClick={handleReturnToLandingButton} className="ml-2">Homepage</button>
                </div>
            </div>
            {
                loading ?
                <Loading></Loading>
                :
                <div></div>
            }
        </div>
    )
}

export default LoginPage;
