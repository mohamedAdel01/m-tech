import Vue from "vue";
import Toasted from "vue-toasted";

Vue.use(Toasted, {
    position: localStorage.getItem('lang') == 'en' ? "top-right" : "top-left",
    theme: "bubble",
    keepOnHover: true,
    duration: 5000,
    className: "toast"
});