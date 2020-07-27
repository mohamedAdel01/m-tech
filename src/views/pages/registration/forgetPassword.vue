<template>
  <div id="login" class="d-flex h-100">
    <section class="cover w-50 h-100 d-flex justify-content-center align-items-center text-center">
      <div class="text-white w-50">
        <h1>{{$t('Hello again')}}</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
      </div>
    </section>
    <section class="w-50 h-100 p-5 d-flex justify-content-center bg-light">
      <div class="col-md-8 col-sm-10 col-12 d-flex flex-wrap justify-content-center">
        <div class="logo my-5">
          <img src="https://site.majles.tech/wp-content/uploads/2020/04/logo-1.png" alt="logo" />
        </div>

        <div class="w-100">
          <div class="bg-white rounded p-3">
            <forget-password-form />
          </div>
          <div class="d-flex justify-content-between">
            <router-link to="/login" class="btn btn-link">{{$t('Back')}}</router-link>
            <button class="btn btn-link">{{$t('Enter')}} ⬛</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import forgetPasswordForm from "@/components/forms/registration/forgetPassword.vue";

export default {
  components: {
    forgetPasswordForm
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
  .line {
    position: relative;
    overflow: hidden;
    &::before {
      content: "";
      position: absolute;
      right: 100px;
      left: 100px;
      top: 50%;
      height: 1px;
      width: 50%;
      background: var(--secondary-color);
      z-index: 1;
    }
    div {
      z-index: 2;
    }
  }
}
</style>