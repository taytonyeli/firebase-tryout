importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js')

firebase.initializeApp({
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: ''
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage(messaging, payload => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  )
  // Customize notification here
  const notificationTitle = 'Background Message Title'
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  }

  // triggers browser show notification
  self.registration.showNotification(notificationTitle, notificationOptions)
})

self.addEventListener('push', event => {
  // double check this. doesn't display correctly
  const data = event.data.json()

  // triggers browser show notification
  self.registration.showNotification(data.title, data.options)
})
