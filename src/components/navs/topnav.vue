<template>
  <nav class="position-fixed w-100 d-flex justify-content-between align-items-center bg-light px-5" data-aos="fade-right">
    <div class="logo">
      <img src="https://site.majles.tech/wp-content/uploads/2020/04/logo-1.png" alt="logo" />
    </div>
    <div class="d-flex align-items-center">
      <div>
        <span>🔔</span>
      </div>
      <div class="border-left border-right mx-4 px-4">
        <b-dropdown variant="transparent">
          <template v-slot:button-content>
            <img class="rounded-circle" src="../../assets/images/default-avatar.jpg" alt />
            <span class="mx-2">user name</span>
          </template>
          <b-dropdown-item @click="changeLang">{{$i18n.locale == 'en' ? 'عربي' : 'English' }}</b-dropdown-item>
          <b-dropdown-item href="#">{{$t('Logout')}}</b-dropdown-item>
        </b-dropdown>
      </div>
      <div>
        <span>02:50 PM</span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    changeLang() {
      if (this.$i18n.locale == "en") {
        localStorage.setItem("lang", "ar");
      } else {
        localStorage.setItem("lang", "en");
      }
      location.reload();
    }
  }
};
</script>

<style lang="scss">
nav {
  z-index: 4;
  height: 70px;
  .logo {
    img {
      width: 200px;
    }
  }

  .b-dropdown {
    img {
      width: 35px;
    }
    button {
      display: flex;
      align-items: center;
      background: white;
      border-radius: 50px;
      box-shadow: 1px 1px 1px #eee;
      padding: 0 10px 0 0;
    }
  }
}
</style>