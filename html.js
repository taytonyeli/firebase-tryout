import React from 'react'
import PropTypes from 'prop-types'

export default function HTML (props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='x-ua-compatible' content='ie=edge' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        {props.headComponents}
        <script type='module' src='/firebase-messaging-sw.js' />
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id='___gatsby'
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        {/* FIREBASE STARTS HERE */}
        <script
          type='module'
          dangerouslySetInnerHTML={{
            __html: `import { initializeApp } from 'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js'
            import {
              getMessaging,
              getToken
            } from 'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js'
            
            const firebaseConfig = {
              apiKey: '',
              authDomain: '',
              projectId: '',
              storageBucket: '',
              messagingSenderId: '',
              appId: '',
              measurementId: ''
            
              // ...
            }
            
            // Initialize Firebase
            
            function requestPermission () {
              console.log('Requesting permission...')
              Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                  const app = initializeApp(firebaseConfig)
                  // Initialize Firebase Cloud Messaging and get a reference to the service
                  const messaging = getMessaging(app)
            
                  // Add the public key generated from the console here.
                  getToken(messaging, {
                    vapidKey:
                      ''
                  })
                    .then(currentToken => {
                      if (currentToken) {
                        // Send the token to your server and update the UI if necessary
                        // ...
                        console.log('the current token', currentToken)
                      } else {
                        // Show permission request UI
                        console.log(
                          'No registration token available. Request permission to generate one.'
                        )
                        // ...
                      }
                    })
                    .catch(err => {
                      console.log('An error occurred while retrieving token. ', err)
                      // ...
                    })
                  console.log('Notification permission granted.')
                } else {
                  console.log('You do not have permission')
                }
              });
            }
            requestPermission();
            
            `
          }}
        />
        {/* FIREBASE ENDS HERE */}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array
}
