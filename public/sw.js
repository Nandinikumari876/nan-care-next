// This file MUST live at public/sw.js so it's served from the site's root
// (e.g. https://nan-care-next.vercel.app/sw.js) — browsers require that.

self.addEventListener('push', function (event) {
  let data = { title: 'Nan Care Hospital', body: 'You have a new update.' };

  try {
    data = event.data.json();
  } catch (e) {
    // if the payload isn't JSON for some reason, fall back to defaults above
  }

  const options = {
    body: data.body,
    icon: '/icon-192.png', // optional: add your hospital logo icon here later
    badge: '/icon-192.png',
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Optional: focus/open the site when the user clicks the notification
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});
