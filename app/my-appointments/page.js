'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import Logo from '../../components/Logo';
import { getToken, clearSession } from '../../lib/auth';

const API = process.env.NEXT_PUBLIC_API_URL;

const statusColors = {
  pending: '#C89B3C',
  confirmed: '#24443B',
  completed: '#4B564F',
  cancelled: '#C97268',
};

export default function MyAppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [payingId, setPayingId] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login?next=/my-appointments');
      return;
    }
    fetchAppointments(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchAppointments(token) {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/api/appointments/mine`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        clearSession();
        router.push('/login?next=/my-appointments');
        return;
      }
      if (!res.ok) throw new Error('Failed to load your appointments');
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  async function handlePayNow(appointmentId) {
    const token = getToken();
    if (!token) {
      router.push('/login?next=/my-appointments');
      return;
    }

    setPayingId(appointmentId);

    try {
      const res = await fetch(`${API}/api/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ appointmentId }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Could not start payment');
        setPayingId(null);
        return;
      }

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: 'Nan Care Hospital',
        description: 'Appointment Payment',
        handler: async function (response) {
          try {
            const verifyRes = await fetch(`${API}/api/payment/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                appointmentId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok) {
              alert('Payment successful!');
              fetchAppointments(token);
            } else {
              alert(verifyData.error || 'Payment verification failed');
            }
          } catch (err) {
            alert('Payment verification failed');
          } finally {
            setPayingId(null);
          }
        },
        modal: {
          ondismiss: function () {
            setPayingId(null);
          },
        },
        theme: {
          color: '#24443B',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert('Something went wrong while starting payment');
      setPayingId(null);
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div style={{ minHeight: '100vh', background: '#F7F3EA', fontFamily: 'sans-serif', padding: '32px 20px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <a href="/" style={{ display: 'inline-block', marginBottom: 24 }}>
            <Logo size={34} />
          </a>

          <h1 style={{ color: '#24443B', fontSize: 26, marginBottom: 20 }}>My Appointments</h1>

          {loading && <p style={{ color: '#4B564F' }}>Loading...</p>}

          {error && (
            <p style={{ color: '#C97268', background: '#FBEAE8', padding: '10px 14px', borderRadius: 6 }}>
              {error}
            </p>
          )}

          {!loading && !error && appointments.length === 0 && (
            <p style={{ color: '#4B564F' }}>You have no appointments yet.</p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {appointments.map((a) => (
              <div
                key={a._id}
                style={{
                  background: '#FFFDF8',
                  borderRadius: 8,
                  padding: '16px 20px',
                  border: '1px solid #DBD2BE',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <b style={{ color: '#1C2420', fontSize: 16 }}>{a.department}</b>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#FFFDF8',
                      background: statusColors[a.status] || '#4B564F',
                      padding: '2px 10px',
                      borderRadius: 999,
                      textTransform: 'uppercase',
                    }}
                  >
                    {a.status}
                  </span>
                </div>

                <p style={{ margin: '8px 0 4px', color: '#4B564F', fontSize: 14 }}>
                  📞 {a.phone}
                </p>

                {a.message && (
                  <p style={{ margin: '4px 0 12px', color: '#4B564F', fontSize: 14, fontStyle: 'italic' }}>
                    &ldquo;{a.message}&rdquo;
                  </p>
                )}

                              <p style={{ margin: '4px 0', color: '#4B564F', fontSize: 13 }}>
                Requested on {new Date(a.createdAt).toLocaleString()}
              </p>

              {a.appointmentDate && a.appointmentTime && (
                <p style={{ margin: '6px 0', color: '#24443B', fontSize: 14, fontWeight: 600 }}>
                  📅 Your appointment: {a.appointmentDate} at {a.appointmentTime}
                </p>
              )}

              {a.status === 'confirmed' && a.paymentStatus !== 'paid' && (
                  <button
                    style={{
                      marginTop: 10,
                      padding: '8px 16px',
                      background: '#24443B',
                      color: '#FFFDF8',
                      border: 'none',
                      borderRadius: 6,
                      fontSize: 14,
                      cursor: 'pointer',
                      opacity: payingId === a._id ? 0.6 : 1,
                    }}
                    disabled={payingId === a._id}
                    onClick={() => handlePayNow(a._id)}
                  >
                    {payingId === a._id ? 'Processing...' : 'Pay Now'}
                  </button>
                )}

                {a.status === 'confirmed' && a.paymentStatus === 'paid' && (
                  <p style={{ marginTop: 10, color: '#24443B', fontSize: 13, fontWeight: 600 }}>
                    ✅ Payment received
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}