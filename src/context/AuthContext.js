import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useReducer, useState } from 'react';
import { auth } from '../Config/firebase';

// Create Auth Context
export const AuthContext = createContext();

// Initial state
const initialState = { isAuthenticated: false, user: null };

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { isAuthenticated: true, user: action.payload.user };
    case 'LOGOUT':
      return { isAuthenticated: false, user: null };
    default:
      return state;
  }
};

export default function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [event, setEvent] = useState({});
  const [document, setDocument] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true); // 🔥 Add loading state
  const [activeStep, setActiveStep] = useState(parseInt(localStorage.getItem('activeStep')) || 0);


  

  useEffect(() => {
    localStorage.setItem('activeStep', activeStep);
  }, [activeStep]);

  useEffect(() => {
  onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: 'LOGIN', payload: { user } });
      } else {
        dispatch({ type: 'LOGOUT' });
      }
      setLoading(false); 
    });

   
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, event, setEvent, activeStep, setActiveStep, document, setDocument, search, setSearch, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
