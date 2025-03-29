import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import ProfilePageNew from './ProfilePageNew'

/*  Wrapper page that should be the entry point (for now) around ProfilePageNew

    The flow is basically if a user signs in for the first time, redirect them here
    alongside any info passed on from the login screen onto the profile page. 

    For example, if they're a first time user, let them know that and make them submit some
    info about their company. If they're missing some required data (E.g. feature 1),
    also let them know. Once that's updated, they can then proceed to the brainstorm page.
*/

const ProfilePageWrapper = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const message = location.state?.message;

    const [hasInfoSubmitted, setHasInfoSubmitted] = useState(true);

    const handleHasInfoSubmitted = (value) => {
        // Callback from child component (ProfilePageNew) -> ProfilePageWrapper
        // To indicated that the user has submitted their info correctly, and can
        // proceed to generate partnerships.
        console.log(hasInfoSubmitted);
        setHasInfoSubmitted(value);
    };

    const handleProceedToBrainstorm = () => {
        navigate('/brainstorm');
    }

    return (
        <div>
            <div className='flex justify-center px-20'>
                <div className='flex flex-col items-stretch ps-16 pe-16 space-y-8 text-sm bg-[#ed7d2d] w-1/2 rounded-lg mt-8 py-4 max-h-[80vh] overflow-y-auto'>
                    { message && (
                        <div className='flex items-center space-x-4 text-white'>
                            <i className='fa-solid fa-circle-info'></i>
                            <p>{message}</p>
                        </div>
                    )}
                </div>
            </div>
            <ProfilePageNew hasInfoSubmitted={handleHasInfoSubmitted}/>
            <div className='flex justify-center py-4'>
                <button 
                    style={{
                        backgroundColor: hasInfoSubmitted ? 'grey' : 'orange ',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                       }}
                    disabled={hasInfoSubmitted}
                    onClick={handleProceedToBrainstorm}>Proceed To Partnership Brainstorm</button>
            </div>
        </div>
    )
}

export default ProfilePageWrapper