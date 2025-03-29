import React, { useContext, useEffect, useState } from 'react'
import { TextField } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ModelContext } from '../Contexts/Context';
import { isFieldInvalid } from '../utils';
import PropTypes from 'prop-types';

const inputLabelStyle = { 
    style: { color: '#000000' } 
}

const inputPropsStyle = { 
    style: { 
        backgroundColor: '#ffffff', 
        textTransform: "capitalize", 
        borderRadius: '10px', 
        minWidth: 250 
    } 
}

const ProfilePageNew = ({ hasInfoSubmitted }) => {
    /*
        As a user, I should have:
        1. companyName input
        2. companyDescription
        3. Three features to layout
    */

    const {user_profile, setUserProfile} = useContext(ModelContext);

    const [isSubmitted, setIsSubmitted] = useState(false);

    const [companyName, setCompanyName] = useState(user_profile ? user_profile.company_name : "");

    const handleCompanyName = (e) => {
        setCompanyName(e.target.value);
    }

    const [companyDescription, setCompanyDescription] = useState("");

    const handleCompanyDescription = (e) => {
        setCompanyDescription(e.target.value);
    }

    const [companyFeatureName1, setCompanyFeatureName1] = useState("");

    const handleCompanyFeatureName1 = (e) => {
        setCompanyFeatureName1(e.target.value);
    }

    const [companyFeatureDescription1, setCompanyFeatureDescription1] = useState("");

    const handleCompanyFeatureDescription1 = (e) => {
        setCompanyFeatureDescription1(e.target.value);
    }

    const [companyFeatureName2, setCompanyFeatureName2] = useState("");

    const handleCompanyFeatureName2 = (e) => {
        setCompanyFeatureName2(e.target.value);
    }

    const [companyFeatureDescription2, setCompanyFeatureDescription2] = useState("");

    const handleCompanyFeatureDescription2 = (e) => {
        setCompanyFeatureDescription2(e.target.value);
    }
  
    const [companyFeatureName3, setCompanyFeatureName3] = useState("");

    const handleCompanyFeatureName3 = (e) => {
        setCompanyFeatureName3(e.target.value);
    }

    const [companyFeatureDescription3, setCompanyFeatureDescription3] = useState("");

    const handleCompanyFeatureDescription3 = (e) => {
        setCompanyFeatureDescription3(e.target.value);
    }

    const handleSubmit = async () => {
        try {
            const formData = {
                'company_name': companyName,
                'company_description': companyDescription,
                'company_feature_name_one': companyFeatureName1,
                'company_feature_description_one': companyFeatureDescription1,
                'company_feature_name_two': companyFeatureName2,
                'company_feature_description_two': companyFeatureDescription2,
                'company_feature_name_three': companyFeatureName3,
                'company_feature_description_three': companyFeatureDescription3,
            };
            
            if (!(isFieldInvalid(companyName) || isFieldInvalid(companyDescription) || isFieldInvalid(companyFeatureName1) || isFieldInvalid(companyFeatureDescription1))) {
              const user_id = JSON.parse(localStorage.getItem("user_id"));
              const resp = await axios.post(`http://127.0.0.1:8000/update_user_profile_db?user_id=${user_id}`, formData);
              toast.success("Profile updated successfully!");
              setIsSubmitted(true);
              hasInfoSubmitted(false);
            } else {
              toast.info("Please ensure the following fields are provided as they are required: company name, description and one feature with description")
            }
        } catch(error) {
          console.log(error);
          toast.error("Failed to Update the profile.");
        }
    }

    useEffect(() => {
      // call get_user_data then set the appropriate state 
      // to render it in the UI beside the input form.
      const get_user_data = async () => {
        // Get the stored user data thats present in the db
        const user_id = JSON.parse(localStorage.getItem("user_id"));
        try {
          const resp = await axios.get(`http://127.0.0.1:8000/get_user_profile?user_id=${user_id}`);
          const userData = resp.data.user_data

          setUserProfile(userData);

          // Update state variables after context is set
          setCompanyName(userData.company_name || "");
          setCompanyDescription(userData.company_description || "");
          setCompanyFeatureName1(userData.company_feature_name_one || "");
          setCompanyFeatureDescription1(userData.company_feature_description_one || "");
          setCompanyFeatureName2(userData.company_feature_name_two || "");
          setCompanyFeatureDescription2(userData.company_feature_description_two || "");
          setCompanyFeatureName3(userData.company_feature_name_three || "");
          setCompanyFeatureDescription3(userData.company_feature_description_three || "");

          setIsSubmitted(false);
        } catch (error) {
          console.error("Error retrieving user data: ", error);
      }
      }
      get_user_data();
    }, [isSubmitted])

    return (
        <div>
            <div className='flex justify-center px-20 py-2'>
                <div className='flex flex-col items-stretch ps-16 pe-16 space-y-8 text-sm bg-[#ed7d2d] w-1/2 rounded-lg mt-8 py-12 max-h-[80vh] overflow-y-auto'>
                    <h1 className='text-4xl text-center pb-2'>Your Company's Profile</h1>
                      <TextField label="Your Company's Name (Required)" 
                          InputLabelProps={inputLabelStyle} 
                          InputProps={inputPropsStyle} 
                          variant="filled" 
                          placeholder="What is your company's name?"
                          name='name' 
                          value={companyName} 
                          onChange={handleCompanyName}
                      />

                      <TextField label="Your Company's Description (Required)"
                        InputLabelProps={inputLabelStyle}
                        InputProps={inputPropsStyle}
                        variant="filled"
                        placeholder='Enter in a description of your company. Please include your target market.'
                        name='companyDescription'
                        value={companyDescription}
                        onChange={handleCompanyDescription}
                        multiline
                        rows={4}
                      />

          
                      <TextField label="Product/Service 1 Name (Required)"
                        InputLabelProps={inputLabelStyle}
                        InputProps={inputPropsStyle}
                        variant="filled"
                        placeholder="What is your first product or service's name?"
                        name='companyFeature1'
                        value={companyFeatureName1}
                        onChange={handleCompanyFeatureName1}
                      />
          
                      <TextField label="Product/Service 1 Description (Required)"
                        InputLabelProps={inputLabelStyle}
                        InputProps={inputPropsStyle}
                        variant="filled"
                        placeholder='Describe your first product or service.'
                        name='companyFeature1Description'
                        value={companyFeatureDescription1}
                        onChange={handleCompanyFeatureDescription1}
                        multiline
                        rows={4}
                      />
          
                      <TextField label="Product/Service 2 Name"
                        InputLabelProps={inputLabelStyle}
                        InputProps={inputPropsStyle}
                        variant="filled"
                        placeholder="What is your second product or service's name?"
                        name='companyFeature2'
                        value={companyFeatureName2}
                        onChange={handleCompanyFeatureName2}
                      />
          
                      <TextField label="Product/Service 2 Description"
                        InputLabelProps={inputLabelStyle}
                        InputProps={inputPropsStyle}
                        variant="filled"
                        placeholder='Describe your second product or service.'
                        name='companyFeature2Description'
                        value={companyFeatureDescription2}
                        onChange={handleCompanyFeatureDescription2}
                        multiline
                        rows={4}
                      />
          
                      <TextField label="Product/Service 3 Name"
                        InputLabelProps={inputLabelStyle}
                        InputProps={inputPropsStyle}
                        variant="filled"
                        placeholder="What is your third product or service's name?"
                        name='companyFeature3'
                        value={companyFeatureName3}
                        onChange={handleCompanyFeatureName3}
                      />
          
                      <TextField label="Product/Service 3 Description"
                        InputLabelProps={inputLabelStyle}
                        InputProps={inputPropsStyle}
                        variant="filled"
                        placeholder='Describe your third product or service.'
                        name='companyFeature3Description'
                        value={companyFeatureDescription3}
                        onChange={handleCompanyFeatureDescription3}
                        multiline
                        rows={4}
                      />


                    <button
                          style={{
                            backgroundColor: 'orange',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                           }}
                           onClick={handleSubmit}
                    >
                           Submit Info
                    </button>
                </div>
            </div>
        </div>
    )
}

// Define default props
ProfilePageNew.defaultProps = {
  onFlagChange: () => {},  // No-op function
};

// PropTypes for better type checking
ProfilePageNew.propTypes = {
  onFlagChange: PropTypes.func,
};

export default ProfilePageNew;
