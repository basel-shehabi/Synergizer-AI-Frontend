import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebaseAuthContext } from '../Contexts/auth-context';
import axios from "axios";
import { ModelContext } from '../Contexts/Context';
import Loading from '../components/Loading';

const WelcomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useFirebaseAuthContext();

  const {user_profile, setUserProfile} = useContext(ModelContext);

  const account_check_new = async () => {
    // TODO: To be refactored at some point
    try {
      setLoading(true);
      const resp = await axios.post(`http://127.0.0.1:8000/account_check_v2?email_id=${user.email}`);
      localStorage.setItem("user_id", JSON.stringify(resp.data.user_id));

      const resp2 = await axios.get(`http://127.0.0.1:8000/get_user_profile?user_id=${resp.data.user_id}`)
      setUserProfile({...resp2.data.user_data})
      if (resp.status && resp2.data.user_data) {
        setLoading(false);
      }
      else if(resp.status){
        setLoading(false);
        navigate('/profile');
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('user_id')) {
      // No need to run multiple API requests if 
      // the user_id is already set.
      account_check_new();
    }
  }, [])


  return (
    <div className="flex p-16 items-center justify-center">

      {
        loading ?
          <Loading></Loading>
          :
          <div className="block p-8 mt-20 bg-white border border-gray-400 rounded-lg text-wrap w-1/2">
            <p className="text-center pb-4 text-3xl font-bold">Welcome to SynergizerAI!</p>
            <p className="text-center pb-4 text-lg font-bold">A world of partnerships awaits you...</p>
            <p className="text-center pb-4 text-lg font-bold">To begin, choose from one of the following options:</p>
            <p className="text-center pb-2 text-lg">Specific Partner: For when you have a specific company in mind you want to partner with and want to strike a lucrative deal</p>
            <p className="text-center pb-8 text-lg">Brainstorm Partner: For when you want to explore different companies and partnership deals using our chatbot</p>
            <div className="flex space-x-4">
                <button onClick={()=>{navigate('/partner')}} className="bg-orange-500 hover:bg-orange-700 transition duration-300 ease-in-out rounded-full text-white px-8 py-3 w-1/2 text-2xl">Specific Partner (BETA)</button>
                <button onClick={()=>{navigate('/brainstorm')}} className="bg-orange-500 hover:bg-orange-700 transition duration-300 ease-in-out rounded-full text-white px-8 py-3 w-1/2 text-2xl">Brainstorm Partner</button>
            </div>
          </div>
        }
    </div>
  )
}

export default WelcomePage; 