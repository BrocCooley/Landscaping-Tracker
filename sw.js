
        self.addEventListener('push', function(event) {
  let data = { title: '🌿 Landscaping Tracker', body: 'You have a notification' };
  try {
  data = event.data.json();
  } catch(e) {
  data.body = event.data ? event.data.text() : 'New notification';
  }
  event.waitUntil(
  self.registration.showNotification(data.title, {
  body: data.body,
  icon: data.icon || undefined,
  badge: data.badge || undefined,
  data: { url: data.url || 'https://broccooley.github.io/Landscaping-Tracker/' }
  })
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  var url = event.notification.data && event.notification.data.url
  ? event.notification.data.url
  : 'https://broccooley.github.io/Landscaping-Tracker/';
  event.waitUntil(
  clients.matchAll({ type: 'window' }).then(function(clientList) {
  for (var i = 0; i < clientList.length; i++) {
  if (clientList[i].url.indexOf('Landscaping-Tracker') !== -1 && 'focus' in clientList[i]) {
  return clientList[i].focus();
  }
  }
  return clients.openWindow(url);
  })
  );
});
