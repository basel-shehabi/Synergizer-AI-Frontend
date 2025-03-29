import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

  const navigate = useNavigate();

  return (
    <>
      <section className=" bg-gradient-to-br from-orange-500 to-orange-300 flex w-1/2 h-[50vh] p-8 mt-20 mx-auto items-center">
        <div className="container mx-auto">
          <div className="-mx-4 flex">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[400px] text-center">
                <h2 className="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
                  404
                </h2>
                <h4 className="mb-3 text-[22px] font-semibold leading-tight text-white">
                  Oops! That page cant be found
                </h4>
                <p className="mb-8 text-lg text-white">
                  The page you are looking for it maybe deleted
                </p>
                <button onClick={() => { navigate('/') }}>Go To Home</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;