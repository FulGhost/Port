import axios from 'axios';
import {useState} from 'react';
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from 'react-router';

export function Dashboard({onLogout}) {
  const [showPanel, setShowPanel] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [dashData, setDashData] = useState({
     organisation: "",
  totalVisitors: 0,
  visitorsToday: 0,
  inBuilding: 0,
  signedOut: 0,
  lastSync: ""
  })

  const navigate = useNavigate();

 // Fetch dashboard metrics from the backend (admin-only endpoint).
 // This call requires a full admin `token` (not the temp visitor token).
 async function dashlog() {
  const response = await axios.get('/api/dashboard', {headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`
  }})
  setDashData(response.data)
 }

async function handleRefresh() {
  try {
    setRefreshing(true)
    await dashlog()
  } finally {
    setRefreshing(false)
  }
}

 function handleClick() {
  setShowPanel(!showPanel)
  dashlog()
 }


 dayjs.extend(relativeTime);

 // Navigate to the QR code generator view used by admins to create
 // organisation-specific scan links.
 function qrCodeGenerator() {
  navigate('/qr-code-generator')
 }

 const orgname = localStorage.getItem("username")
 

  return (
    <>
      <div className='relative mr-2 inline-flex align-middle'>
      <button className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1px] shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
      onClick={handleClick}
      >
        <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_90deg,#06b6d4,#8b5cf6,#ec4899,#22c55e,#06b6d4)] transition-transform duration-700 group-hover:rotate-180"></span>
        <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white text-[10px] font-black text-blue-950 ring-1 ring-white/70">
          AF
        </span>
      </button>

      {showPanel && (
        <div className='absolute left-2 z-50 mt-7 w-80 rounded-xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/15'>
          <div className="mb-4 flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Dashboard</p>
              <h2 className="text-lg font-extrabold tracking-tight text-blue-950">{orgname} Portal</h2>
            </div>
            <button
              className={`ml-10 flex items-center justify-center w-8 h-8 rounded-md border border-gray-200 bg-white text-slate-700 shadow-sm transition-transform duration-200 hover:scale-105 ${refreshing ? 'cursor-wait opacity-80' : 'hover:opacity-95'}`}
              onClick={async (e) => { e.stopPropagation(); await handleRefresh(); }}
              disabled={refreshing}
              aria-label="Refresh dashboard"
            >
              <svg className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M21 12a9 9 0 1 1-3-6.7" />
                <polyline points="21 3 21 9 15 9" />
              </svg>
            </button>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
              Online
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <p className="text-xs font-semibold text-slate-500">Visitors Today</p>
              <p className="mt-1 text-2xl font-black text-slate-950">{dashData.visitorsToday}</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-cyan-50 p-3">
              <p className="text-xs font-semibold text-cyan-700">In Building</p>
              <p className="mt-1 text-2xl font-black text-cyan-950">{dashData.inBuilding}</p>
            </div>
          </div>

          <div className="mt-3 rounded-lg border border-slate-100 p-3">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Quick Status</p>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Check-in system</span>
                <span className="font-bold text-emerald-600">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Signed Out</span>
                <span className="font-bold text-amber-600">{dashData.signedOut}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Last sync</span>
                <span className="font-bold text-slate-800">{dayjs(dashData.lastSync).fromNow()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Generate Qr code</span>
                <span className="font-bold text-slate-800"><button className="border border-gray-400 w-12 rounded-lg bg-gray-400 cursor-pointer hover:opacity-80 active:opacity-60"
                onClick={qrCodeGenerator}>⌘</button></span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
            <a href="#" className="text-sm font-bold text-blue-950 hover:underline">
              View reports
            </a>
            <button className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm font-bold text-red-600 transition-colors hover:bg-red-100"
            onClick={onLogout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  )
}
