import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useFirebaseAuthContext } from '../Contexts/auth-context';

const Navbar = ({ userProfile }) => {
    const navigate = useNavigate();
    const location = useLocation(); 
    const { user, googleLogout } = useFirebaseAuthContext();

    const handleSignOut = async () => {
        try {
            await googleLogout();
            localStorage.clear();
            navigate('/login');
        } catch (err) {
            console.log('An error occured signing out.', err);
        }
    }

    const renderNavBarItems = (location, userProfile) => {
        if (location.pathname == '/profile-incomplete') {
            return;
        } else if (userProfile) {
            return (
                <>                           
                    <i class="fa-solid fa-user"></i>
                    <button className='text-lg' onClick={() => { navigate('/profile') }} >Profile</button>
                </>
            )
        } else {
            return (
                <div>
                    <i class="fa-solid fa-backward"></i>
                    <button className='text-lg pl-2' onClick={() => { navigate('/main') }} >Welcome Page</button>
                </div>
            )
        }
    }

    return (
        <>
            <div className='bg-[#ed7d2d] flex p-4 justify-between items-center font-bold rounded-b-xl'>
                <div className='flex items-center'>
                    <div className='ml-3 pr-4'>
                        <i class="fa-solid fa-house"></i>
                        <button className='text-lg pl-2' onClick={() => { navigate('/') }}>Home</button>
                    </div>
                    {userProfile && location.pathname !== '/main' ? (
                        <div>
                            <i class="fa-solid fa-backward"></i>
                            <button className='text-lg pl-2' onClick={() => { navigate('/main') }} >Welcome Page</button>
                        </div>
                    ) : null}
                </div>
                {user && user.displayName ? <p className="ml-16">Welcome {user.displayName}</p> : <p> Welcome! </p>}
                <div className='flex space-x-8 items-center'>
                    { renderNavBarItems(location, userProfile) }
                    <div>
                        <i class="fa-solid fa-door-open"></i>
                        <button className='text-lg pr-4 pl-2' onClick={handleSignOut}>Logout</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;