import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../components/LoadingSpinner";

export function VisitorScan() {
  const { organisationId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orgName, setOrgName] = useState("");

  useEffect(() => {
    async function handleScan() {
      try {
          // Call the backend scan endpoint. Backend returns a short-lived
          // `tempToken` for visitors along with the organisation name.
          const response = await axios.get(`/auth/scan/${organisationId}`);
  
          // Only write `tempToken` when the backend actually returns one.
          if (response.data?.tempToken) {
            localStorage.setItem("tempToken", response.data.tempToken);
            // Optionally store organisation name for visitor UI
            localStorage.setItem("visitorOrgName", response.data.organisation.username);
          }
  
          setOrgName(response.data.organisation.username);
  
          // Briefly show welcome then navigate back to landing/home.
          setTimeout(() => navigate("/"), 1500);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Invalid QR code");
      } finally {
        setLoading(false);
      }
    }
    handleScan();
  }, [organisationId, navigate]);

  localStorage.setItem("visitorOrgName", orgName)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 py-10">
        <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl text-center">
          <div className="mx-auto mb-8 h-16 w-16 rounded-full border-4 border-slate-200 border-t-slate-700 animate-spin" />
          <p className="text-3xl font-bold text-slate-900">{<LoadingSpinner/> && "Loading..."}</p>
          <p className="mt-3 text-sm text-slate-500">Checking your visitor access and redirecting shortly.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 py-10">
        <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl text-center">
          <p className="text-4xl font-extrabold text-red-600">Oops!</p>
          <p className="mt-4 text-xl font-semibold text-red-700">{error}</p>
          <p className="mt-3 text-sm text-slate-500">Please try scanning again or contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 py-10">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-12 shadow-xl text-center">
        <p className="text-5xl font-extrabold text-slate-900">Welcome to {orgName}</p>
        <p className="mt-5 text-2xl text-slate-600">Redirecting you to the sign-in page...</p>
      </div>
    </div>
  );
}
