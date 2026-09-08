'use client';

import { useState, useEffect } from 'react';
import { subscribeToPush } from '../../lib/push';
const API = process.env.NEXT_PUBLIC_API_URL;

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState('');
  const [authed, setAuthed] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Remember the key for this browser tab session, so refreshing the
  // page doesn't force you to log in again.
  useEffect(() => {
    const saved = sessionStorage.getItem('nanCareAdminKey');
    if (saved) {
      setAdminKey(saved);
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (authed) {
      fetchAppointments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  async function fetchAppointments() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/api/appointments`, {
        headers: { 'x-admin-key': adminKey },
      });
      if (res.status === 401) {
        setError('Invalid admin key.');
        setAuthed(false);
        sessionStorage.removeItem('nanCareAdminKey');
        setLoading(false);
        return;
      }
      if (!res.ok) throw new Error('Failed to load appointments');
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

 function handleLogin(e) {
    e.preventDefault();
    if (!adminKey.trim()) return;
    sessionStorage.setItem('nanCareAdminKey', adminKey.trim());
    setAuthed(true);
    subscribeToPush(null, true); // NEW — subscribe this browser as admin
  }

  function handleLogout() {
    sessionStorage.removeItem('nanCareAdminKey');
    setAdminKey('');
    setAuthed(false);
    setAppointments([]);
  }

  async function updateStatus(id, status) {
    setError('');
    try {
      const res = await fetch(`${API}/api/appointments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      const updated = await res.json();
      setAppointments((prev) =>
        prev.map((a) => (a._id === updated._id ? updated : a))
      );
    } catch (err) {
      setError(err.message || 'Failed to update');
    }
  }

  // ---------- Styles (kept inline so this page doesn't depend on globals.css) ----------
  const colors = {
    forest: '#24443B',
    gold: '#C89B3C',
    blush: '#C97268',
    bg: '#F7F3EA',
    ink: '#1C2420',
    inkSoft: '#4B564F',
    line: '#DBD2BE',
    white: '#FFFDF8',
  };

  const statusColors = {
    pending: colors.gold,
    confirmed: colors.forest,
    completed: '#4B564F',
    cancelled: colors.blush,
  };

  // ---------- Login screen ----------
  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
        <form
          onSubmit={handleLogin}
          style={{ background: colors.white, padding: 32, borderRadius: 10, width: 340, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
        >
          <h2 style={{ color: colors.forest, marginTop: 0, marginBottom: 6 }}>Admin Login</h2>
          <p style={{ color: colors.inkSoft, fontSize: 14, marginTop: 0, marginBottom: 20 }}>
            Enter the admin key to manage appointments.
          </p>
          <input
            type="password"
            placeholder="Admin key"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: `1px solid ${colors.line}`, marginBottom: 14, fontSize: 15 }}
          />
          {error && <p style={{ color: colors.blush, fontSize: 13, marginTop: -6, marginBottom: 12 }}>{error}</p>}
          <button
            type="submit"
            style={{ width: '100%', padding: '10px 12px', background: colors.forest, color: colors.white, border: 'none', borderRadius: 6, fontSize: 15, cursor: 'pointer' }}
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  // ---------- Dashboard ----------
  return (
    <div style={{ minHeight: '100vh', background: colors.bg, fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={{ color: colors.forest, fontSize: 26, margin: 0 }}>Appointments</h1>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={fetchAppointments}
              style={{ padding: '8px 14px', background: colors.white, color: colors.forest, border: `1px solid ${colors.line}`, borderRadius: 6, cursor: 'pointer' }}
            >
              Refresh
            </button>
            <button
              onClick={handleLogout}
              style={{ padding: '8px 14px', background: 'transparent', color: colors.blush, border: `1px solid ${colors.blush}`, borderRadius: 6, cursor: 'pointer' }}
            >
              Logout
            </button>
          </div>
        </div>

        {error && (
          <p style={{ color: colors.blush, background: '#FBEAE8', padding: '10px 14px', borderRadius: 6, marginBottom: 16 }}>
            {error}
          </p>
        )}

        {loading && <p style={{ color: colors.inkSoft }}>Loading...</p>}

        {!loading && appointments.length === 0 && (
          <p style={{ color: colors.inkSoft }}>No appointments yet.</p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {appointments.map((a) => (
            <div
              key={a._id}
              style={{ background: colors.white, borderRadius: 8, padding: '16px 20px', border: `1px solid ${colors.line}` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <b style={{ color: colors.ink, fontSize: 16 }}>{a.fullName}</b>
                  <span
                    style={{
                      marginLeft: 10,
                      fontSize: 12,
                      fontWeight: 600,
                      color: colors.white,
                      background: statusColors[a.status] || colors.inkSoft,
                      padding: '2px 10px',
                      borderRadius: 999,
                      textTransform: 'uppercase',
                    }}
                  >
                    {a.status}
                  </span>
                </div>
                <span style={{ color: colors.inkSoft, fontSize: 13 }}>
                  {new Date(a.createdAt).toLocaleString()}
                </span>
              </div>

              <p style={{ margin: '8px 0 4px', color: colors.inkSoft, fontSize: 14 }}>
                📞 {a.phone} &nbsp;|&nbsp; 🏥 {a.department}
              </p>
              {a.message && (
                <p style={{ margin: '4px 0 12px', color: colors.inkSoft, fontSize: 14, fontStyle: 'italic' }}>
                  &ldquo;{a.message}&rdquo;
                </p>
              )}

              <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                {['pending', 'confirmed', 'completed', 'cancelled']
                  .filter((s) => s !== a.status)
                  .map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(a._id, s)}
                      style={{
                        padding: '6px 12px',
                        fontSize: 13,
                        borderRadius: 6,
                        border: `1px solid ${statusColors[s]}`,
                        background: 'transparent',
                        color: statusColors[s],
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                      }}
                    >
                      Mark {s}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
