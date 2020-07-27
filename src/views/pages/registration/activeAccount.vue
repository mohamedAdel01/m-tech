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
          <img src="https://site.majles.tech/wp-content/uploads/2020/04/logo-1.png" alt="logo" />
        </div>

        <div class="w-100">
          <div class="d-flex justify-content-center text-center">
            <h6
              class="mb-3 w-75 text-black-50"
            >{{$t('Please Check you email and click on the activation link')}}</h6>
          </div>
          <div class="bg-white rounded p-3 d-none">
            <active-account-form ref="activeAccountForm" />
          </div>
          <div class="text-right d-none">
            <button class="btn btn-link" @click="activeAccount">{{$t('Next')}} ⬛</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import mixins from "@/mixins";
import activeAccountForm from "@/components/forms/registration/activeAccount.vue";

export default {
  mixins: [mixins],
  components: {
    activeAccountForm
  },
  methods: {
    activeAccount() {
      let form = this.$refs.activeAccountForm.checkData();
      if (!form)
        return this.$toasted.error(this.$t("Please provide a valid data"));
      this.handleRequest("REGISTRATION", "ACTIVE_ACCOUNT", form).then(res => {
        this.$toasted.success("Your account activated successfully");
        this.$router.push("/login");
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