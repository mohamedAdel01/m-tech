
<template>
  <div id="my-account" data-aos="fade-down">
    <page-title mainTitle="My Account" />
    <tabs-sec />
    <div>
      <router-view data-aos="fade-right" />
    </div>
  </div>
</template>\

<script>
import pageTitle from "@/components/theme/pageTitle.vue";
import tabsSec from "@/components/sections/my-account/tabs.vue";

export default {
  components: {
    pageTitle,
    tabsSec
  }
};
</script>
