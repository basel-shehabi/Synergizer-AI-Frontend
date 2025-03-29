import React, { useState } from 'react';
import { TextField, MenuItem, Box } from '@mui/material';
import { cityOptions } from '../constants/constants';
import axios from 'axios';
import { toast } from 'react-toastify';

const Contact = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [results, setResults] = useState([]);
    const [show, setShow] = useState(false);
    const [resultFlag, setResultFlag] = useState(false);
    const [loading, setLoading] = useState(false);
    const [emails, setEmails] = useState({});

    const handleSearch = async () => {
      try {
        if (searchTerm && selectedLocation) {
          setLoading(true);
          setEmails({});
          const response = await axios.post(`http://127.0.0.1:8000/get_contacts`, { "company_name": searchTerm, "company_location": selectedLocation });
          if (response.data.contacts) {
            setResults(response.data.contacts);
            setResultFlag(true);
          }
          setShow(true);
        } else {
          toast.warning("Please ensure all inputs are provided.");
        }
      } catch (error) {
        setResultFlag(false);
      } finally {
        setLoading(false);
      }
    };

    const handleLink = (linkedin_url) => {
      window.open(linkedin_url, '_blank');
    };

    const showEmail = async (index, contactId) => {
      try {
        const response = await axios.post(`http://127.0.0.1:8000/get_contact_email`, contactId );
        if (response.data.email_id) {
          setEmails((prev) => ({ ...prev, [index]: response.data.email_id }));
        } else if (response.data.error) {
          toast.error("No valid email found for the user.");
        } else {
          toast.error("An unknown error has occured.");
        }
      } catch (error) {
        toast.error("Error fetching email.");
      }
    };

    return (
      <main className="my-8 w-4/5 mx-auto p-4 border-2 border-orange-500 rounded-lg h-[550px]">
        <Box className="flex w-full space-x-4">
          <div className="w-3/4">
            <TextField
              fullWidth
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-1/4">
            <TextField
              select
              fullWidth
              label="Location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              variant="outlined"
            >
              {cityOptions.map((location, index) => (
                <MenuItem key={index} value={location}>
                  {location}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </Box>

        {loading ? (
          <div className='mt-4 h-96 text-orange-500 text-2xl p-4 rounded-md flex flex-col items-center justify-center'>Loading...</div>
        ) : (
          show ? (
            resultFlag ? (
              <section className="mt-4 h-96 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((result, index) => (
                  <div key={index} className="bg-orange-400 h-44 p-4 rounded-md flex flex-col justify-between">
                    <div><span className="text-sm lg:text-base font-semibold">Full Name:</span> {result.name}</div>
                    <div><span className="text-sm lg:text-base font-semibold">Title:</span> {result.title}</div>
                    {emails[index] && <div><span className="text-sm lg:text-base font-semibold">Email:</span> {emails[index]}</div>}
                    <div className="flex justify-between">
                      <button onClick={() => { handleLink(result.linkedin_url) }} className="bg-white text-orange-500 border-2 border-orange-500 text-sm lg:text-base font-semibold py-1 px-2 rounded">Linkedin</button>
                      {!emails[index] && (
                        <button onClick={() => { showEmail(index, result.id) }} className="bg-white text-orange-500 border-2 border-orange-500 text-sm lg:text-base font-semibold py-1 px-2 rounded">Show Email</button>
                      )}
                    </div>
                  </div>
                ))}
              </section>
            ) : (
              <div className='mt-4 h-96 text-orange-500 text-2xl p-4 rounded-md flex flex-col items-center justify-center'>No contacts found.</div>
            )
          ) : (
            <div className='mt-4 h-96 text-orange-500 text-2xl p-4 rounded-md flex flex-col items-center justify-center'>Please enter the partner company name and location in mind to get the relevant contact info!</div>
          )
        )}

        <div className='flex justify-center'>
          <button onClick={handleSearch} className="bg-orange-500 hover:bg-orange-700 transition duration-300 ease-in-out rounded-lg text-white mt-5 px-4 py-2 w-1/4 text-xl">Search</button>
        </div>
      </main>
    );
};

export default Contact;