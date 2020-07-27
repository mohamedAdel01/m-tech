<template>
  <div id="application">
    <topnav />
    <div class="layout position-relative d-flex justify-content-end">
      <sidebar />
      <main class="px-md-5 px-3 py-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import topnav from "@/components/navs/topnav.vue";
import sidebar from "@/components/navs/sidebar.vue";
export default {
  components: {
    topnav,
    sidebar
  }
};
</script>

<style lang="scss">
#application {
  .layout {
    padding-top: 70px;
    main {
      width: calc(100% - 270px);
    }
  }
}
</style>