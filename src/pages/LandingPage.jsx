import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Typewriter } from 'react-simple-typewriter'
import { useFirebaseAuthContext } from '../Contexts/auth-context';

const LandingPage = () => {
    const navigate = useNavigate();
    const { user } = useFirebaseAuthContext();

    const handleTryNow = () => {
      if (user) {
        navigate('/main');
      } else {
        navigate('/login')
      }
    }
   
    
    return (
        <div>
            <section className='bg-[#ED7D2DBF] rounded-b-xl p-8'>
                <div className='flex flex-col space-y-8 items-center mb-8'>
                    <div className='text-[#171A1FBF] text-4xl'>Revolutionize Your Business Development Efforts with Synergizer AI</div>
                    <div className='text-3xl italic px-16 py-2 border-2 border-neutral-500 rounded-md shadow-md flex items-center'>
                        <Typewriter
                            words={["Google x Oracle", "Microsoft x Nvidia", "Shell x Castrol"]}
                            loop={false}
                            cursor
                            cursorStyle='|'
                        />
                    </div>
                    
                </div>
            </section>
            
            <section className='px-4 py-8 pb-24' id='how-it-works'>
                <div className='flex flex-col space-y-8 items-center'>
                    <div className='text-[#171A1FBF] text-4xl'>Our Product, at a glance</div>
                    <div className='flex justify-evenly'>
                        <div className='w-1/4 p-4 rounded-lg flex flex-col  space-y-2 bg-[#ED7D2DBF]'>
                            <img className='h-9' src="./material-psychology.svg" alt="logo" />
                            <h1 className='text-4xl text-center px-2 xl:px-8 font-bold text-neutral-900'>Partnerships Reimagined.</h1>
                            <p className='px-2 xl:px-8 text-center'>Generate creative partnership deal suggestions with companies that are complimentary to your products/features.</p>
                        </div>
                        <div className='w-1/4 p-4 rounded-lg flex flex-col  space-y-2 bg-[#ED7D2DBF]'>
                            <img className='h-8' src="./material-crisis-alert.svg" alt="logo" />
                            <h1 className='text-4xl text-center px-2 xl:px-8 font-bold text-neutral-900'>Focus on what matters most.</h1>
                            <p className='px-2 xl:px-8 text-center'>Spend less time coming up with partnership scenarios as using our partnership brainstormer will provide a multitude of partnership types and deals</p>
                        </div>
                        <div className='w-1/4 p-4 rounded-lg flex flex-col  space-y-2 bg-[#ED7D2DBF]'>
                            <img className='h-8' src="./material-hiking.svg" alt="logo" />
                            <h1 className='text-4xl text-center px-2 xl:px-8 font-bold text-neutral-900'>With you every step of the way.</h1>
                            <p className='px-2 xl:px-8 text-center'>Soon enough, you will have access to the information of any partner such as their contact details, helping you to easily reach out to them.</p>
                        </div>
                    </div>
                    <div className='flex flex-col pt-8 space-y-8 items-center'>
                        <p className='text-[#171A1FBF] text-4xl'>Interested? Press 'Try Now' to begin your experience!</p>
                        <button onClick={handleTryNow} className='bg-neutral-900 text-white text-4xl rounded-3xl shadow-md px-8 py-2'>{user ? 'Back To Demo' : 'Try Now'}</button>
                    </div>
                </div>
            </section>

            <footer className='bg-[#ED7D2DBF] rounded-t-xl p-8 flex justify-center'>
                <div className='flex space-x-6 text-center'></div>
            </footer>
        </div>
    )
}

export default LandingPage;