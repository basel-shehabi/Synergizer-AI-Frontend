import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { isFieldInvalid } from '../utils';
import { toast } from 'react-toastify';
import axios from 'axios';

const Partner = () => {
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState(0);

    const toggleItem = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const [company_description, setDescription] = useState("");
    const [company_name, setName] = useState("");
    const [company_location, setLocation] = useState("");
    const [company_industry, setIndustry] = useState("");
    const [feature1, setFeature1] = useState("");
    const [feature1_description, setF1Description] = useState("");
    const [feature2, setFeature2] = useState("");
    const [feature2_description, setF2Description] = useState("");
    const [feature3, setFeature3] = useState("");
    const [feature3_description, setF3Description] = useState("");
    const [partnership_goal, setPartnershipGoal] = useState("");

    const handleDescription = (e) => {
        const value = e.target.value;
        setDescription(value);
    };

    const handleName = (e) => {
        const value = e.target.value;
        setName(value);
    };

    const handleLocation = (e) => {
        const value = e.target.value;
        setLocation(value);
    };

    const handleIndustry = (e) => {
        const value = e.target.value;
        setIndustry(value);
    };

    const handleFeature1 = (e) => {
        const value = e.target.value;
        setFeature1(value);
    };

    const handleF1Description = (e) => {
        const value = e.target.value;
        setF1Description(value);
    };

    const handleFeature2 = (e) => {
        const value = e.target.value;
        setFeature2(value);
    };

    const handleF2Description = (e) => {
        const value = e.target.value;
        setF2Description(value);
    };

    const handleFeature3 = (e) => {
        const value = e.target.value;
        setFeature3(value);
    };

    const handleF3Description = (e) => {
        const value = e.target.value;
        setF3Description(value);
    };
    
    const handlePartnershipGoal = (e) => {
        const value = e.target.value;
        setPartnershipGoal(value);
    };

    // TOOD: Put this in a common api module as it might be called in a few diff places.
    const fetchUserProfileData = async () => {
        const user_id = JSON.parse(localStorage.getItem("user_id"));
        const userData = await axios.get(
            `http://127.0.0.1:8000/get_user_profile?user_id=${user_id}`
        ).then((response) => response.data.user_data);
        return userData
    }

    const handleSpecificPartnerSubmit = async () => {
        try {
            if (!(isFieldInvalid(company_name) || isFieldInvalid(company_description) ||
                  isFieldInvalid(company_location) || isFieldInvalid(company_industry) ||
                  isFieldInvalid(feature1) || isFieldInvalid(feature1_description) || isFieldInvalid(partnership_goal))) {
                const otherCompanyData = {
                    'other_company_name': company_name,
                    'other_company_description': company_description,
                    'other_company_location': company_location,
                    'other_company_industry': company_industry,
                    'other_company_feature_name_one': feature1,
                    'other_company_feature_description_one': feature1_description,
                    'other_company_feature_name_two': feature2,
                    'other_company_feature_description_two': feature2_description,
                    'other_company_feature_name_three': feature3,
                    'other_company_feature_description_three': feature3_description,
                    'partnership_goal': partnership_goal,
                }
                const userCompanyData = await fetchUserProfileData();
                const allCompanyData = {
                    myCompanyData: {...userCompanyData},
                    partnerCompanyData: {...otherCompanyData}
                }
                navigate('/partnerdeal', { state: allCompanyData });
            } else {
                toast.info("Please ensure all the required input fields are set.")
            }
        } catch (error) {
            console.log('An error occured: ', error);
        }
    }

    return (
        <>
            <section className='min-h-screen flex flex-col items-center space-y-8'>
                <div className='w-full md:w-3/5 mt-10 flex flex-col border-2 rounded-md shadow-lg px-8 bg-[#ed7d2d] pb-4'>
                    <div className='text-xl w-2/3 text-center mx-auto mt-10 pb-8'>
                        To provide the best results, we require information about the potential partner and partnership you have in mind. Please provide the information below then press "Generate Deal".
                    </div>
                    <div className="mb-4 shadow-lg rounded-md bg-[#ffffff]">
                        <div className="flex justify-between items-center p-4">
                            <div className="text-lg font-semibold">Potential Partner Details & Partnership Goal (Required)</div>
                            <div className='flex'>
                                <button
                                    onClick={() => toggleItem(0)}
                                    className="flex justify-between items-center p-1 bg-[#ed7d2d] rounded-md"
                                >
                                    <svg
                                        className={`w-8 h-8 transition-transform transform ${openIndex === 0 ? 'rotate-180' : ''}`}
                                        fill="#ffffff"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {openIndex === 0 && (
                            <div className="p-4 bg-white rounded-md space-y-4">
                                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                    <TextField
                                        label="Potential Partner Name"
                                        InputLabelProps={{ style: { color: '#000000' } }}
                                        InputProps={{ style: { borderColor: '#000000', borderRadius: '10px' } }}
                                        variant="filled"
                                        placeholder="What is your potential partner company's name?"
                                        name='company_name'
                                        value={company_name}
                                        onChange={handleName}
                                    />
                                    <TextField
                                        label="Partner Location"
                                        InputLabelProps={{ style: { color: '#000000' } }}
                                        InputProps={{ style: { borderColor: '#000000', borderRadius: '10px' } }}
                                        variant="filled"
                                        placeholder='Where does the partner operate?'
                                        name='company_location'
                                        value={company_location}
                                        onChange={handleLocation}
                                    />
                                    <TextField
                                        label="Partner Industry"
                                        InputLabelProps={{ style: { color: '#000000' } }}
                                        InputProps={{ style: { borderColor: '#000000', borderRadius: '10px' } }}
                                        variant="filled"
                                        placeholder="What is the potential partner's industry?"
                                        name='company_industry'
                                        value={company_industry}
                                        onChange={handleIndustry}
                                    />
                                </div>
                                <div className='grid grid-cols-1 gap-4'>
                                    <TextField
                                            label="Partnership Goal"
                                            InputLabelProps={{ style: { color: '#000000' } }}
                                            InputProps={{ style: { borderColor: '#000000', textTransform: "capitalize", borderRadius: '10px' } }}
                                            variant="filled"
                                            placeholder='Please describe the outcomes you are seeking from this potential partnership.'
                                            name='partnership_goal'
                                            value={partnership_goal}
                                            onChange={handlePartnershipGoal}
                                            fullWidth
                                    />
                                </div>
                                <div className='grid grid-cols-1 gap-4'>
                                    <TextField
                                            label="Potential Partner Description"
                                            InputLabelProps={{ style: { color: '#000000' } }}
                                            InputProps={{ style: { borderColor: '#000000', textTransform: "capitalize", borderRadius: '10px' } }}
                                            variant="filled"
                                            placeholder='Describe your potential partner. Be as specific as possible.'
                                            name='company_description'
                                            value={company_description}
                                            onChange={handleDescription}
                                            fullWidth
                                            multiline
                                            rows={4}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mb-4 shadow-lg rounded-md bg-[#ffffff]">
                        <div className="flex justify-between items-center p-4">
                            <div className="text-lg font-semibold">Company Product/Service One Details (Required)</div>
                            <div className='flex'>
                                <button
                                    onClick={() => toggleItem(1)}
                                    className="flex justify-between items-center p-1 bg-[#ed7d2d] rounded-md"
                                >
                                    <svg
                                        className={`w-8 h-8 transition-transform transform ${openIndex === 1 ? 'rotate-180' : ''}`}
                                        fill="#ffffff"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {openIndex === 1 && (
                            <div className="p-4 bg-white rounded-md space-y-4">
                                <TextField
                                    label="Name"
                                    InputLabelProps={{ style: { color: '#000000' } }}
                                    InputProps={{ style: { borderColor: '#000000', borderRadius: '10px' } }}
                                    variant="filled"
                                    name='feature1'
                                    value={feature1}
                                    onChange={handleFeature1}
                                    fullWidth
                                />
                                <TextField
                                    label="Description"
                                    InputLabelProps={{ style: { color: '#000000' } }}
                                    InputProps={{ style: { borderColor: '#000000', borderRadius: '10px' } }}
                                    variant="filled"
                                    name='feature1_description'
                                    value={feature1_description}
                                    onChange={handleF1Description}
                                    multiline
                                    rows={4}
                                    fullWidth
                                />
                            </div>
                        )}
                    </div>

                    <div className="mb-4 shadow-lg rounded-md bg-[#ffffff]">
                        <div className="flex justify-between items-center p-4">
                            <div className="text-lg font-semibold">Company Product/Service Two Details</div>
                            <div className='flex'>
                                <button
                                    onClick={() => toggleItem(2)}
                                    className="flex justify-between items-center p-1 bg-[#ed7d2d] rounded-md"
                                >
                                    <svg
                                        className={`w-8 h-8 transition-transform transform ${openIndex === 2 ? 'rotate-180' : ''}`}
                                        fill="#ffffff"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {openIndex === 2 && (
                            <div className="p-4 bg-white rounded-md space-y-4">
                                <TextField
                                    label="Name"
                                    InputLabelProps={{ style: { color: '#000000' } }}
                                    InputProps={{ style: { borderColor: '#000000', borderRadius: '10px' } }}
                                    variant="filled"
                                    name='feature2'
                                    value={feature2}
                                    onChange={handleFeature2}
                                    fullWidth
                                />
                                <TextField
                                    label="Description"
                                    InputLabelProps={{ style: { color: '#000000' } }}
                                    InputProps={{ style: { borderColor: '#000000', borderRadius: '10px' } }}
                                    variant="filled"
                                    name='feature2_description'
                                    value={feature2_description}
                                    onChange={handleF2Description}
                                    multiline
                                    rows={4}
                                    fullWidth
                                />
                            </div>
                        )}
                    </div>

                    <div className="mb-4 shadow-lg rounded-md bg-[#ffffff]">
                        <div className="flex justify-between items-center p-4">
                            <div className="text-lg font-semibold">Company Product/Service Three Details</div>
                            <div className='flex'>
                                <button
                                    onClick={() => toggleItem(3)}
                                    className="flex justify-between items-center p-1 bg-[#ed7d2d] rounded-md"
                                >
                                    <svg
                                        className={`w-8 h-8 transition-transform transform ${openIndex === 3 ? 'rotate-180' : ''}`}
                                        fill="#ffffff"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {openIndex === 3 && (
                            <div className="p-4 bg-white rounded-md space-y-4">
                                <TextField
                                    label="Name"
                                    InputLabelProps={{ style: { color: '#000000' } }}
                                    InputProps={{ style: { borderColor: '#000000', borderRadius: '10px' } }}
                                    variant="filled"
                                    name='feature3'
                                    value={feature3}
                                    onChange={handleFeature3}
                                    fullWidth
                                />
                                <TextField
                                    label="Description"
                                    InputLabelProps={{ style: { color: '#000000' } }}
                                    InputProps={{ style: { borderColor: '#000000', borderRadius: '10px' } }}
                                    variant="filled"
                                    name='feature3_description'
                                    value={feature3_description}
                                    onChange={handleF3Description}
                                    multiline
                                    rows={4}
                                    fullWidth
                                />
                            </div>
                        )}
                    </div>
                    <Button
                            variant="contained"
                            style={{
                                backgroundColor: 'orange',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                            }}
                            onClick={handleSpecificPartnerSubmit}
                        >
                            Generate Deal
                    </Button>
                </div>
            </section>
        </>
    );
};

export default Partner;
