<template>
  <div id="company-name" class="d-flex h-100">
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

        <div class="w-100">
          <div class="line d-flex jus tify-content-center align-items-center mb-4">
            <div
              class="border bg-secondary w-50 rounded px-3 py-1 mx-4 text-center font-14 text-black-50"
            >{{$t('Company name')}}</div>
            <div
              class="border bg-light w-50 text-center rounded px-3 py-1 mx-4 font-14 text-black-50"
            >{{$t('Login')}}</div>
          </div>
          <div class="bg-white rounded p-3">
            <company-name-form ref="companyNameForm" />
          </div>
          <div class="d-flex justify-content-end mt-3">
            <button
              :disabled="processing"
              class="btn btn-link d-flex align-items-center p-0"
              @click="checkSlug"
            >
              <span class="mx-2 font-14">{{$t('Next')}}</span>
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
import nextIcon from "@/components/SVG/next.vue";
import logoIcon from "@/components/SVG/logo.vue";
import mixins from "@/mixins";
import companyNameForm from "@/components/forms/registration/companyName.vue";

export default {
  mixins: [mixins],
  components: {
    nextIcon,
    companyNameForm,
    logoIcon
  },
  methods: {
    checkSlug() {
      let form = this.$refs.companyNameForm.checkData();
      if (!form)
        return this.$toasted.error(this.$t("Please provide a valid data"));
      this.handleRequest("REGISTRATION", "CHECK_SLUG", form).then(res => {
        this.$router.push("/login");
      });
    }
  },
  computed: {
    processing() {
      return this.$store.getters.processing;
    }
  }
};
</script>

<style lang="scss" scoped>
#company-name {
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