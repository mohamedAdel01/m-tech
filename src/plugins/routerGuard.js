import router from "../router";
import store from "../store";

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.secure)) {

    if (!store.getters.token) next({ name: "company-name" });
    else next();

  } else if (to.matched.some(record => record.meta.nonsecure)) {
    if (store.getters.token) next({ name: "home" });
    else next();

  } else next();

});
