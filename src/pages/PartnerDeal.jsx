import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import axios from 'axios'
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { TextField } from '@mui/material';
import { isFieldInvalid } from '../utils';

const PartnerDeal = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const allCompanyData = location.state;

    const [perplexityResponse, setPerplexityResponse] = useState('');
    const [userFeedback, setUserFeedback] = useState('');
    const [loading, setLoading] = useState(true);
    const [feedbackDialog, setFeedbackDialog] = useState(false);
    const [retriggerResponse, setRetriggerResponse] = useState(false);

    useEffect(() => {
        const getPerplexityResponse = async () => {
            try {
                console.log(allCompanyData);
                let response = '';
                if (!isFieldInvalid(userFeedback)) {
                    response = await axios.post(`http://127.0.0.1:8000/api/submit-all-company-data?userFeedback=${userFeedback}`, allCompanyData);
                } else {
                    response = await axios.post('http://127.0.0.1:8000/api/submit-all-company-data', allCompanyData);
                }
                setPerplexityResponse(response.data.response);
                setLoading(false);
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };

        getPerplexityResponse();

    }, [retriggerResponse]);

    const handleUserFeedback = (e) => {
        const value = e.target.value;
        setUserFeedback(value);
    };

    const handleAdditionalFeedbackSubmit = () => {
        setFeedbackDialog(false);
        setRetriggerResponse((prev) => !prev);
        setLoading(true);
    };

    return (
        <div>
            <div className='flex justify-center mt-8'>
                <div className='flex justify-center items-center w-3/4 text-sm bg-[#ed7d2d] rounded-lg py-4'>
                    <div className='flex items-center space-x-4 text-white'>
                        <i className='fa-solid fa-circle-info'></i>
                        <p>Synergizer AI can make mistakes and cannot provide legal advice. Please validate the information provided and use it at your discretion.</p>
                    </div>
                </div>
            </div>
            <main className='flex justify-center items-center'>
                <section className='flex flex-col mt-8 mb-8 border-2 rounded-lg shadow-lg p-16 w-3/4 space-y-8'>
                    <div className='text-3xl font-semibold'>Here is the generated deal:</div>
                    <div className='px-8'>
                        <div className='mb-4 text-lg'>Details:</div>
                        <div className='border-2 border-black rounded-2xl h-80 overflow-y-auto px-4 py-2'>
                            {
                                loading ? ( 
                                    <div className={`fixed inset-0 z-20 opacity-100 flex flex-col space-y-4 justify-center items-center ${loading ? 'block' : 'hidden'}`}>
                                        <svg aria-hidden="true" className="w-28 h-28 text-gray-200 animate-spin fill-orange-500 opacity-100" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <p className="text-orange text-xl">Loading...</p>
                                    </div>
                                ) : (
                                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                                        {perplexityResponse}
                                    </ReactMarkdown>
                                )
                            }
                        </div>
                    </div>
                    <div className='flex justify-evenly'>
                        <div className='flex flex-col space-y-2 w-1/4 items-center'>
                            <h2 className=''>Don't like what you see?</h2>
                            <button
                                onClick={() => setFeedbackDialog(true)} 
                                className="bg-orange-500 hover:bg-orange-700 transition duration-300 ease-in-out rounded-md text-white px-8 py-3 "
                                data-tooltip-id="feedback-tooltip"
                                data-tooltip-content="Provide any additional feedback to refine the deal shown above."
                                data-tooltip-place="bottom"
                            >
                                Give Feedback & Regenerate Deal
                            </button>
                            <Tooltip id="feedback-tooltip" />
                        </div>
                        <div className='flex flex-col space-y-2 w-1/4 items-center'>
                            <h2>Need Partner Contact Details?</h2>
                            <button 
                                className="bg-gray-500 rounded-md text-white px-8 py-3"
                                data-tooltip-id="contact-feature-tooltip"
                                data-tooltip-content="This feature is coming soon."
                                data-tooltip-place="right"
                                disabled
                            >
                                Get Contact Info!
                            </button>
                            <Tooltip id="contact-feature-tooltip" />
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <div className='flex flex-col space-y-2 items-center'>
                            <h2>Have another partner company in mind?</h2>
                            <button onClick={() => navigate('/partner')} className="bg-orange-500 hover:bg-orange-700 transition duration-300 ease-in-out rounded-md text-white px-8 py-3">Restart Specific Search</button>
                        </div>
                    </div>
                    {
                        feedbackDialog
                        ?
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded shadow-md w-full max-w-xl">
                                <h2 className="text-xl font-bold mb-4">Provide Feedback</h2>
                                <p className="mb-4">Provide any additional input to refine the deal generated below</p>
                                <TextField
                                        InputLabelProps={{ style: { color: '#000000' } }}
                                        InputProps={{ style: { borderColor: '#000000', borderRadius: '10px' } }}
                                        variant="filled"
                                        placeholder='Please provide any additional data/feedback here...'
                                        name='user_feedback'
                                        value={userFeedback}
                                        onChange={handleUserFeedback}
                                        fullWidth
                                        multiline
                                        rows={4}
                                />
                                <div className="flex justify-end pt-4">
                                    <button
                                        onClick={() => setFeedbackDialog(false)}
                                        className="bg-gray-300 text-black py-2 px-4 rounded mr-2"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-red-500 text-white py-2 px-4 rounded"
                                        onClick={handleAdditionalFeedbackSubmit}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                        :
                        null
                    }
                </section>
            </main>
        </div>
    )
}

export default PartnerDeal;