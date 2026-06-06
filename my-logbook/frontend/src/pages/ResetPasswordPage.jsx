import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router";

export function ResetPassword() {
  const { resetToken: token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  console.log(`Token:${token}`)

  async function handleSubmit() {
    if (!password)              return setError("Please enter a new password");
    if (password.length < 8)   return setError("Password must be at least 8 characters");
    if (password !== confirm)   return setError("Passwords do not match");

    setLoading(true);
    setError(null);

    try {
      await axios.post("/auth/reset-password", {
        token,
        newPassword: password,
      });
      setSuccess(true);
      // redirect to login after 3 seconds
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-sm -translate-y-10 bg-white/40 backdrop-blur-md border border-white/40 p-4 rounded-2xl shadow-lg shadow-slate-200/40">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100/90 text-3xl">
              ✅
            </div>
            <h2 className="text-2xl font-semibold text-slate-900">Password Reset Successfully</h2>
            <p className="mt-2 text-sm text-slate-600">Your password has been updated. Redirecting to login now.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex items-center justify-center px-4 py-17">
      <div className="w-full max-w-sm -translate-y-10 bg-white/40 backdrop-blur-md border border-white/40 p-4 rounded-2xl shadow-lg shadow-slate-200/40">
        <div className="mb-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Reset Password</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Set a new password</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Enter a secure password below to restore access to your account.
          </p>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-100/70 bg-red-100/80 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-5 space-y-4">
          <label className="block text-sm font-medium text-slate-400">
            New password
            <input
              className="mt-2 w-full rounded-2xl border border-slate-200/40 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none transition duration-200 focus:border-slate-300 focus:ring-4 focus:ring-slate-800/50"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </label>

          <label className="block text-sm font-medium text-slate-400">
            Confirm password
            <input
              className="mt-2 w-full rounded-2xl border border-slate-200/40 bg-slate-950/40 px-4 py-3 text-sm text-slate-100 outline-none transition duration-200 focus:border-slate-300 focus:ring-4 focus:ring-slate-800/50"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm new password"
            />
          </label>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-7 inline-flex w-full items-center justify-center rounded-2xl bg-slate-900/95 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500"
        >
          {loading ? "Resetting password..." : "Reset password"}
        </button>

        <p className="mt-5 text-center text-sm text-slate-600 inline-block ml-5">
          Remembered your password?
        </p>
        <a href="/" className="font-semibold text-slate-900 inline-block ml-2 hover:underline ">Sign in instead</a>
      </div>
    </section>
  );
}