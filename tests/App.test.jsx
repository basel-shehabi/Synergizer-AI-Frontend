import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';
import { ModelContext } from '../src/Contexts/Context';
import { FireBaseAuthContext } from '../src/Contexts/auth-context';
import '@testing-library/jest-dom';

// Mock firebase/app
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({})),
}));

// Mock firebase/auth with a proper GoogleAuthProvider implementation
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    onAuthStateChanged: jest.fn((callback) => {
      callback({ uid: 'mock-user-id', displayName: 'Mock User' });
      return () => {}; 
    }),
  })),
  signInWithPopup: jest.fn().mockResolvedValue({ user: { uid: 'mock-user-id', displayName: 'Mock User' } }),
  signOut: jest.fn().mockResolvedValue({}),
  GoogleAuthProvider: jest.fn().mockImplementation(() => ({
    setCustomParameters: jest.fn(),
  })),
}));


describe('App Component', () => {

  it('renders the homepage as a logged in user and can navigate to the main page', async () => {
    render(
      <ModelContext.Provider
        value={{
          modelData: {},
          setModelData: jest.fn(),
          partnershipData: {},
          setPartnershipData: jest.fn(),
          userProfile: {},
          setUserProfile: jest.fn(),
        }}
      >
        <FireBaseAuthContext>
          <App />
        </FireBaseAuthContext>
      </ModelContext.Provider>
    );

    const backToDemoButton = screen.getByText(/Back To Demo/i);
    expect(backToDemoButton).toBeInTheDocument();

    // attempt to navigate to the main page from the landing page
    await fireEvent.click(backToDemoButton);

    expect(window.location.pathname).toBe('/main');

    // check that the user is there and rendered correctly on the navBar
    const welcomeUser = screen.getByText(/Welcome Mock User/i);
    expect(welcomeUser).toBeInTheDocument();

  });

});