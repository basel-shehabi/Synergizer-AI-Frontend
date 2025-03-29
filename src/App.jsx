import React, { useState } from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from './components/Navbar';
import PrivateRoute from './auth/private-route';
import { ModelContext } from './Contexts/Context';
import { FireBaseAuthContext } from './Contexts/auth-context';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WelcomePage from './pages/WelcomePage';
import ProfilePageNew from './pages/ProfilePageNew';
import ProfilePageWrapper from './pages/ProfilePageWrapper';
import Partner from './pages/Partner';
import PartnerDeal from './pages/PartnerDeal';
import Layout from './pages/Layout';

const App = () => {

  const [modelData, setModelData] = useState({});
  const [partnershipData, setPartnershipData] = useState({});
  const [userProfile, setUserProfile] = useState({})

  const PageWithNavBar = (page, profile) => {
    // Wrapper function that wraps the page to include a nav bar
    return (
      <>
        <Navbar userProfile={profile} />
        {page}
      </>
    )
  }

  return (
    <>
      <ModelContext.Provider value={{ modelData, setModelData, partnershipData, setPartnershipData, userProfile, setUserProfile }}>
        <FireBaseAuthContext>
          <BrowserRouter>
            <ToastContainer position="top-center" style={{ width: "auto" }} />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route index path="/login" element={<LoginPage />} />
              <Route path="/notfound" element={<NotFound />} />
              <Route element={<PrivateRoute />}>
                <Route path="/profile" element={PageWithNavBar(<ProfilePageNew hasInfoSubmitted={() => {}} />, false)} />
                <Route path="/profile-incomplete" element={PageWithNavBar(<ProfilePageWrapper />, true)} />
                <Route path="/brainstorm" element={PageWithNavBar(<Layout />, true)} />
                <Route path="/main" element={PageWithNavBar(<WelcomePage />, true)} />
                <Route path="/partner" element={PageWithNavBar(<Partner />,true)} />
                <Route path="/partnerdeal" element={PageWithNavBar(<PartnerDeal />,true)} />
              </Route>
            </Routes>
          </BrowserRouter>
        </FireBaseAuthContext>
      </ModelContext.Provider>
    </>
  )
}

export default App
