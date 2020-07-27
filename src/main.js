import Vue from 'vue'
import Aos from "aos";
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './plugins/i18n'
import firebase from './services/firebase'
import './plugins/vstyle'
import './plugins/routerGuard'
import './plugins/bootstrap'
import './plugins/toasted'
import './plugins/vuelidation'
import "aos/dist/aos.css";

Vue.use(require('vue-moment'));

Vue.config.productionTip = false

export const Bus = new Vue();

new Vue({
  created() {

    // Initialize Firebase
    firebase.initMessaging();
    const messaging = firebase.messaging();
    
    firebase.onBackgroundMessage();
    let dispatch = this.$store.dispatch
    messaging.onMessage(function(payload){
        const noteTitle = payload.notification.title;
        const noteOptions = {
            body: payload.notification.body,
            icon: payload.notification.icon,
        };
        firebase.eventHandler(payload.notification,dispatch)
    });

    Aos.init({
      duration: 1000,
      delay: 100,
      once: true
    });
  },
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
