'use client';
import React, { useReducer } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

type TabState = boolean;
type TabAction = { type: 'toggle' };
const initialState: TabState = false;

const tabReducer = (state: TabState, action: TabAction): TabState => {
  switch (action.type) {
    case 'toggle':
      return !state;
    default:
      return state;
  }
};

const AuthForm = () => {
  const [tabState, dispatch] = useReducer(tabReducer, initialState);
  const toggleTab = () => {
    dispatch({ type: 'toggle' });
  };

  return (
    <div className="auth-form-container">
      <div className="tab-buttons">
        <button onClick={toggleTab} className={tabState ? 'active' : ''}>
          Sign In
        </button>
        <button onClick={toggleTab} className={!tabState ? 'active' : ''}>
          Sign Up
        </button>
      </div>

      <AnimatePresence>
        <motion.div
          key={tabState ? 'signUp' : 'signIn'}
          initial={{ opacity: 0, x: 100 }} 
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {tabState ? <SignUpForm /> : <SignInForm />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthForm;
