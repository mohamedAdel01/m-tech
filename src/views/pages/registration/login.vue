<template>
  <div id="login" class="d-flex h-100">
    <section class="cover w-50 h-100 d-flex justify-content-center align-items-center text-center">
      <div class="text-white w-50">
        <h1>{{$t('Welcome back')}}</h1>
        <p>{{$t('By entering the platform, you can view and manage everything related to your meetings with ease and flexibility')}}</p>
      </div>
    </section>
    <section class="w-50 h-100 p-5 d-flex justify-content-center bg-light">
      <div class="col-md-8 col-sm-10 col-12 d-flex flex-wrap justify-content-center">
        <div class="logo my-5">
          <logo-icon />
        </div>

        <b-spinner v-show="loading" variant="primary" label="Spinning" />

        <div class="w-100" v-show="!loading">
          <div class="line d-flex justify-content-center align-items-center mb-4">
            <div
              class="border bg-white w-50 rounded px-3 py-1 mx-4 text-center font-14"
            >{{$t('Company name')}}</div>
            <div
              class="border bg-secondary w-50 text-center rounded px-3 py-1 mx-4 font-14"
            >{{$t('Login')}}</div>
          </div>
          <div class="bg-white rounded p-3">
            <login-form ref="loginForm" />
            <div class="text-right">
              <router-link
                to="/forget-password"
                class="btn btn-link py-0 font-14"
              >{{$t('Forget password?')}}</router-link>
            </div>
          </div>
          <div class="d-flex justify-content-end mt-3">
            <button :disabled="processing" class="btn btn-link" @click="login">
              <span class="mx-2 font-14">{{$t('Enter')}}</span>
              <next-icon v-show="!processing" />
              <b-spinner v-show="processing" variant="primary" label="Spinning" />
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import mixins from "@/mixins";
import nextIcon from "@/components/SVG/next.vue";
import logoIcon from "@/components/SVG/logo.vue";
import loginForm from "@/components/forms/registration/login.vue";

export default {
  mixins: [mixins],
  components: {
    nextIcon,
    loginForm,
    logoIcon
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    processing() {
      return this.$store.getters.processing;
    }
  },
  methods: {
    login() {
      let form = this.$refs.loginForm.checkData();
      if (!form)
        return this.$toasted.error(this.$t("Please provide a valid data"));
      this.handleRequest("REGISTRATION", "LOGIN", form).then(res => {
        this.$router.push("/");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  .cover {
    background-image: url("../../../assets/images/register_bg.png");
    background-size: cover;
  }
  .logo {
    img {
      width: 200px;
    }
  }
}
</style>