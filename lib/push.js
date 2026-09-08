// Converts the VAPID public key (a base64 string) into the format the
// browser's push API expects. This is boilerplate — you don't need to
// change it.
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Call this after an appointment is successfully booked, passing the
// appointment's _id (from the backend's response) so we can link the
// subscription to that specific appointment.
export async function subscribeToPush(appointmentId, isAdmin = false) {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.warn('Push notifications are not supported in this browser.');
    return { success: false, reason: 'unsupported' };
  }

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    return { success: false, reason: 'permission-denied' };
  }

  const registration = await navigator.serviceWorker.register('/sw.js');
  await navigator.serviceWorker.ready;

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
    ),
  });

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription, appointmentId, isAdmin }),
  });

  if (!response.ok) {
    return { success: false, reason: 'save-failed' };
  }

  return { success: true };
}
