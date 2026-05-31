import React, { useState } from 'react';
import { Header } from '../components/Header';
import backgroundimg from '../../public/images/logbackgrnd.jpg'

/**
 * AuthenticationGateway - Artistic Edition
 * 
 * A high-fidelity authentication gateway featuring an artistic, textured background.
 * Built with React and Tailwind CSS.
 * 
 * Features:
 * - Tabbed interface for Sign In / Create Account
 * - Artistic ambient background integration
 * - Glassmorphic form container for depth and readability
 * - Responsive layout for desktop and mobile
 */

export function LandingPage() {
  const [activeTab, setActiveTab] = useState('signin');

  return (
    <div className="h-[calc(100vh-4.75rem)] overflow-hidden flex flex-col text-slate-900 bg-transparent">
      <Header />
      
      {/* Background Layer */}
      <div className="hidden">
        <img 
          src={backgroundimg} 
          alt="Artistic Logbook Background" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/40" />
      </div>

      {/* Navigation */}
      {/* <nav className="relative z-10 w-full px-6 py-6 md:px-12 flex justify-between items-center">
        <div className="text-xl font-extrabold tracking-tighter text-[#002c53] uppercase">
          Sovereign <span className="text-slate-600">Logbook</span>
        </div>
        <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <a href="#" className="hover:text-[#002c53] transition-colors">Platform</a>
          <a href="#" className="hover:text-[#002c53] transition-colors">Security</a>
          <a href="#" className="hover:text-[#002c53] transition-colors">Manifest</a>
          <a href="#" className="hover:text-[#002c53] transition-colors">Support</a>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-bold text-slate-700 hover:text-[#002c53] transition-colors">Sign In</button>
          <button className="px-5 py-2.5 rounded-lg bg-[#002c53] text-white font-bold text-sm hover:bg-[#003d73] transition-all shadow-lg shadow-blue-900/10">
            Get Started
          </button>
        </div>
      </nav> */}

      {/* Main Authentication Container */}
      <main className="flex-1 min-h-0 flex items-center justify-center px-4 py-4">
        <div className="w-full max-w-sm bg-white/50 backdrop-blur-md border border-white/40 rounded-lg p-5 shadow-lg shadow-slate-200/40">
          
          {/* Header Icon */}
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/80 text-[#002c53] shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>

          <h1 className="text-center text-2xl font-extrabold text-[#002c53] mb-1">
            Institutional Access
          </h1>
          <p className="mb-5 text-center text-sm font-medium text-slate-500">
            Secure entry to the Sovereign Asset Logbook
          </p>

          {/* Auth Tabs */}
          <div className="mb-5 flex rounded-lg bg-slate-100/50 p-1 border border-slate-200/50">
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
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Address</label>
              <input 
                type="email" 
                placeholder="name@organization.com"
                className="w-full rounded-lg border border-slate-200 bg-white/50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#002c53]/30 focus:ring-4 focus:ring-[#002c53]/5 transition-all"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Password</label>
                <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-[#002c53] transition-colors">Forgot?</a>
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-200 bg-white/50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-[#002c53]/30 focus:ring-4 focus:ring-[#002c53]/5 transition-all"
              />
            </div>
            <button className="w-full rounded-lg bg-[#002c53] py-3 font-bold text-white shadow-lg shadow-blue-900/20 hover:opacity-90 active:opacity-80 transition-all">
              {activeTab === 'signin' ? 'Access Logbook' : 'Initialize Account'}
            </button>
          </form>

          {/* Security Indicator Icons */}
          <div className="mt-5 flex justify-center gap-5 text-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-4 py-3 border-t border-slate-200/50 bg-white/30 backdrop-blur-md">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs font-medium text-slate-500">
            &copy; 2024 Sovereign Logbook. Institutional Grade Asset Documentation.
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

