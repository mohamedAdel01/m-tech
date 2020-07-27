import axios from "axios";
import store from '../store'

export default () => {
  let Api = axios.create({
    baseURL: 'https://beta.development-majles.tech/',
    headers: {
      Authorization: `Bearer ${store.getters.token}`,
      'Content-Type': "application/json",
      Accept: "application/json",
      local: localStorage.getItem('lang') || 'ar'
      // Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MjcsImV4cGlyYXRpb24iOiIyMDIwLTA2LTI4IDEzOjE2OjQzIn0.bsS97YP_dgy36xpXag4WJEU-BUsDCRDyyBcqfL3vk20`,
      // local: "ar"
    }
  })

  Api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        store.dispatch('REGISTRATION', {
          service: 'LOGOUT',
          payload: null
        }).then(res => {
          location.reload(true);
        })
      }
    }
  );

  return Api
}
