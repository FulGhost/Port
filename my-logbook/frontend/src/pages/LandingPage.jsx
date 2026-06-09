import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Link } from 'react-router';


//Lifted up states from app.jsx
export function LandingPage({organisationDetails, setOrganisationDetails, onLogin, setData, setOrganisationId}) {
  const [activeTab, setActiveTab] = useState('signin');
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [verifiedMessage, setVerifiedMessage] = useState(null);
  const [sending, setSending] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)

  //Displays verified if org verifies mail
    useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("verified") === "true") {
      setVerifiedMessage("Email verified successfully. You can now log in.");
      // clean up the URL
      window.history.replaceState({}, "", "/");
    }
  }, []);

  // function passed into onChange in various inputs to update typed texts
  function OrgInput(event) {
    setOrganisationDetails(
      {
        ...organisationDetails,
        [event.target.name]: event.target.value,
      }
    )
  }

  //Function passed into initialise/login button that sends data to the backend
async function handleAuth() {
  try {
    setIsLoading(true)
    setError(null)
    setSuccess(false)
    if (activeTab === 'signup') {
const { data } = await axios.post('/auth/signup', {
  username: organisationDetails.username,
  email: organisationDetails.email,
  password: organisationDetails.password
 })
 onLogin(data.token);
 setSuccess(true)
 setSuccessMessage(data?.message)
 return;
  }

  const response = await axios.post('/auth/login', {
    email: organisationDetails.email,
    password: organisationDetails.password
  })
  localStorage.setItem("username",response.data.organisation.username)
  setData({username:response.data.organisation.username})
 onLogin(response.data.token)
 localStorage.setItem("organisationId",response.data.organisation.id)
 setOrganisationId(response.data.organisation.id)
 setSuccess(true)
 } catch (err) {
  const message = err.response?.data?.message || "Something went wrong";
  setError(message);
  } finally {
    setIsLoading(false)
  }
  
}

 async function handlereset() {
  try {
    setIsSent(false)
    setLoading(true)
    await axios.post('/auth/forgot-password', {email: organisationDetails.email})
    setIsSent(true)
  } catch (err) {
    const message = err.response?.data?.message || "Something went wrong";
    setError(message)
  } finally {
    setLoading(false)
  }

}

async function resendVerificaton() {
  try {
    setSending(true)
     setIsSent(false)
 const {data} =  await axios.post('/auth/resend-verification', {email: organisationDetails.email})
  setIsSent(true)
  setSuccessMessage(data?.message)
  } catch (err) {
    const message = err.response?.data?.message || "Something went wrong"
    setError(message)
  } finally {
    setSending(false)
  }
}

  return (
    <div className="h-[calc(100vh-4.75rem)] overflow-hidden flex flex-col text-slate-900 bg-transparent">
      {verifiedMessage && (
        <div className="mb-4 flex justify-end">
          <p className="max-w-xs rounded-2xl bg-white px-4 py-3 text-right text-sm font-semibold text-emerald-700 shadow-sm shadow-slate-200">
            {verifiedMessage}
          </p>
        </div>
      )}
      
      {/* Main Authentication Container */}
      <main className="flex-1 min-h-0 flex items-center justify-center px-4">
        <div className="w-full max-w-sm -translate-y-10 bg-white/40 backdrop-blur-md border border-white/40 p-4 rounded-2xl shadow-lg shadow-slate-200/40">
          
          {/* Header Icon */}
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/80 text-[#002c53] shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>

          <h1 className="text-center text-xl font-extrabold text-[#002c53] mb-1">
            Institutional Access
          </h1>
          <p className="mb-3 text-center text-sm font-medium text-slate-500">
            Secure entry to the Andy-Fidel Logbook
          </p>

          {/* Auth Tabs */}
          <div className="mb-3 flex rounded-lg bg-slate-100/50 p-1 border border-slate-200/50">
            <button 
              onClick={() => setActiveTab('signin')}
              className={`flex-1 rounded-md py-2 text-sm font-bold transition-all ${activeTab === 'signin' ? 'bg-white text-[#002c53] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setActiveTab('signup')}
              className={`flex-1 rounded-md py-2 text-sm font-bold transition-all ${activeTab === 'signup' ? 'bg-white text-[#002c53] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <div>
              {activeTab === 'signup' && (
                <>
                  <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-slate-400">Username</label>
                  <input 
                  name="username"
                  onChange={OrgInput}
                  value={organisationDetails.username}
                    placeholder="Username"
                    className="w-full rounded-lg border border-slate-200 bg-white/50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#002c53]/30 focus:ring-4 focus:ring-[#002c53]/5 transition-all mb-2"
                  />
                </>
              )}
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Address</label>
              <input 
              name="email"
              onChange={OrgInput}
              value={organisationDetails.email}
                placeholder="name@organization.com"
                className="w-full rounded-lg border border-slate-200 bg-white/50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#002c53]/30 focus:ring-4 focus:ring-[#002c53]/5 transition-all"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Password</label>
                {activeTab === 'signin' && (
                  <a href="#" onClick={handlereset} disabled={isLoading} className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-[#002c53] transition-colors">{isLoading && <LoadingSpinner/>}{loading ? "Sending..." : "Forgot?"}</a>
                )}
              </div>
              <input 
              name="password"
              onChange={OrgInput}
              value={organisationDetails.password}
                type="password" 
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-200 bg-white/50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#002c53]/30 focus:ring-4 focus:ring-[#002c53]/5 transition-all"
              />
            </div>
            <button className="w-full rounded-lg bg-[#002c53] py-2.5 font-bold text-white shadow-lg shadow-blue-900/20 hover:opacity-90 active:opacity-80 transition-all"
            onClick={handleAuth}
            disabled={isLoading}
            >
              {isLoading && <LoadingSpinner/>}
              {isLoading
    ? "Initializing..."
    : activeTab === "signin"
      ? "Access Logbook"
      : "Initialize Account"}
            </button>
            <a disabled={isLoading} onClick={resendVerificaton} className="text-sm hover:underline cursor-pointer ">{sending && <LoadingSpinner/>}
            {sending ? 'Sending...' : 'Resend verification link?'}
            </a>
          </form>

          {/* Security Indicator Icons */}
          <div className="mt-3 flex justify-center gap-5 text-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
          </div>
          <div>
            {error && <p className="text-red-600 ml-3 mt-2">{error}</p>}
            {success && <p className="ml-3 mt-2 text-green-400">{successMessage}</p>}
            {isSent && <p className="text-green-400 ml-3 mt-2">{successMessage}</p> }
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-4 py-3 border-t border-slate-200/50 bg-white/30 backdrop-blur-md">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs font-medium text-slate-500">
            &copy; 2024 Andy-Fidel Logbook. Institutional Grade Asset Documentation.
          </p>
          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-[#002c53] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#002c53] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#002c53] transition-colors">Regulatory</a>
            <a href="#" className="hover:text-[#002c53] transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

