import React, { useState, useEffect } from 'react';
import { cityOptions } from '../constants/constants';
import { TextField, MenuItem, Button, Box } from '@mui/material';
import axios from 'axios';

const Slideshow = () => {
    const [partnerCompanyName, setPartnerCompanyName] = useState('');
    const [partnerCompanyLocation, setPartnerCompanyLocation] = useState('');
    const [partnerCompanyIndustry, setPartnerCompanyIndustry] = useState('');
    const [partnershipType, setPartnershipType] = useState('');
    const [partnershipStructure, setPartnershipStructure] = useState('');
    const [userData, setUserData] = useState();

    useEffect(() => {

        const get_user_data = async () => {

            const user_id = JSON.parse(localStorage.getItem("user_id"));

            try {
                const resp = await axios.get(`http://127.0.0.1:8000/get_user_profile?user_id=${user_id}`);
                const retrievedUserData = resp.data.user_data
    
                setUserData(retrievedUserData);
                console.log(retrievedUserData);
    
            } catch (error) {
                console.error("Error retrieving user data: ", error);
            }

        }

        get_user_data();

    }, [])


    return (
        <main className="my-8 w-4/5 mx-auto p-4 border-2 border-orange-500 rounded-lg h-[550px]">
            <p className="text-orange-500 text-xl p-4 rounded-md">Using this tool, you can generate slideshows that summarize the partnership between your company and your partner company of choice, 
                including its benefits, in order to pitch to the partner company! But before we begin, we require a few inputs before we generate the slideshows</p>
            <p className="text-orange-500 text-xl p-4 rounded-md">Partner Company Details</p>
            <Box className="pt-4 pl-4 pr-4 pb-4 flex w-full space-x-4">
                <div className="w-1/3">
                    <TextField
                        fullWidth
                        label="Partner Company Name"
                        variant="outlined"
                        value={partnerCompanyName}
                        onChange={(e) => setPartnerCompanyName(e.target.value)}
                    />
                </div>
                <div className="w-1/3">
                    <TextField
                        select
                        fullWidth
                        label="Partner Company Location"
                        variant="outlined"
                        value={partnerCompanyLocation}
                        onChange={(e) => setPartnerCompanyLocation(e.target.value)}
                    >
                    {cityOptions.map((location, index) => (
                        <MenuItem key={index} value={location}>
                            {location}
                        </MenuItem>
                    ))}
                    </TextField>
                </div>
                <div className="w-1/3">
                    <TextField
                        fullWidth
                        label="Partner Company Industry"
                        variant="outlined"
                        value={partnerCompanyIndustry}
                        onChange={(e) => setPartnerCompanyIndustry(e.target.value)}
                    >
                    </TextField>
                </div>
            </Box>
            <p className="text-orange-500 text-xl p-4 rounded-md">Partnership Details</p>
            <Box className="pt-4 pl-4 pr-10 flex w-full space-x-4">
                <div className="w-1/3">
                    <TextField
                        fullWidth
                        label="Type of Partnership"
                        variant="outlined"
                        value={partnershipType}
                        onChange={(e) => setPartnershipType(e.target.value)}
                    />
                </div>
                <div className="w-1/3">
                    <TextField
                        fullWidth
                        label="Structure of Partnership"
                        variant="outlined"
                        value={partnershipStructure}
                        onChange={(e) => setPartnershipStructure(e.target.value)}
                    >
                    </TextField>
                </div>
            </Box>
            <div className='pt-16 flex justify-center'>
                <button className="bg-orange-500 hover:bg-orange-700 transition duration-300 ease-in-out rounded-lg text-white mt-5 px-4 py-2 w-1/4 text-xl">Generate Slides!</button>
            </div>
        </main>
    )
}

export default Slideshow