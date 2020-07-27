<template>
  <div id="login" class="d-flex h-100">
    <section
      class="cover col-md-4 h-100 d-flex justify-content-center align-items-center text-center"
    >
      <div class="text-white w-50">
        <h1>{{$t('Welcome back')}}</h1>
        <p>{{$t('By entering the platform, you can view and manage everything related to your meetings with ease and flexibility')}}</p>
      </div>
    </section>
    <section class="col-md-8 h-100 px-3 py-5 d-flex justify-content-center bg-light overflow-auto">
      <div class="col-12 d-flex flex-wrap justify-content-center">
        <div class="w-100">
          <div class="bg-white rounded p-3">
            <register-form ref="registerForm" />
            <router-link to="/login" class="btn btn-link py-0">{{$t('Login')}}</router-link>
          </div>
          <div class="text-right mb-5 mt-3">
            <button class="btn btn-link" @click="register">
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
import registerForm from "@/components/forms/registration/register.vue";

export default {
  mixins: [mixins],
  components: {
    nextIcon,
    registerForm
  },
  computed: {
    processing() {
      return this.$store.getters.processing;
    }
  },
  methods: {
    register() {
      let form = this.$refs.registerForm.checkData();
      if (!form)
        return this.$toasted.error(this.$t("Please provide a valid data"));
      this.handleRequest("REGISTRATION", "REGISTER", form).then(res => {
        this.$router.push("/active-account");
      });
    }
  },
  created() {
    this.$store.dispatch("COMMON", {
      service: "RESOURCES",
      reqPayload: "positions,locations"
    });
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  .vs__dropdown-toggle input {
    height: 2em !important;
  }
}
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