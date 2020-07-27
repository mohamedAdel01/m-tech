import firebase from 'firebase'
import {firebaseConfig} from "@/constants/firebase-config.js";

export default{
    data:{
        messaging:null
    },
    initMessaging(){
        firebase.initializeApp(firebaseConfig);

        const messaging = firebase.messaging();
        messaging.onTokenRefresh(() => {
            messaging.getToken().then((refreshedToken) => {
              localStorage.setItem("fcm", currentToken);
              //handle update fcm token here
            }).catch((err) => {
              console.log('Unable to retrieve refreshed token ', err);
              showToken('Unable to retrieve refreshed token ', err);
            });
          });
          this.data.messaging = messaging
    },
    messaging(){
        return this.data.messaging
    },
    onBackgroundMessage(){
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then((registration) => {
        this.data.messaging.useServiceWorker(registration)
        this.data.messaging.usePublicVapidKey("BE4J1LUa2oRrb_FJJAYEpQR-hPsl9ljb61u2r3NTi3TsOJPa3_7CbQhvbfPZ6iuOJI_oA9HyHvZmKXhBkXj1mck");
        this.data.messaging.getToken().then((currentToken) => {
          if (currentToken) {
            console.log(currentToken)
            localStorage.setItem("fcm", currentToken);
          } else {
            // Show permission request.
            console.log('No Instance ID token available. Request permission to generate one.');
          }
        }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
    
      }).catch(err => {
        console.log(err)
      })
    },
    eventHandler(notification,dispatch){
      switch(notification.title){
        // case 'startVoting':
        case 'part one Meeting title 12 part two':
          dispatch("NOTIFICATIONS", {
            service: "VOTING",
            reqPayload: "openVotingModel"
          });
      }
    }
}