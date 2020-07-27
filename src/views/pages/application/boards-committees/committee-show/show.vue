<template>
  <div data-aos="fade-down">
    <page-title mainTitle="Boards and Committees" :replacements="{'1': 'Committee name'}" />
    <tabs-sec title="committee title" button="Edit comittee info" service="show" type="committee" id="1" />
    <router-view data-aos="fade-right" />
  </div>
</template>

<script>
import pageTitle from "@/components/theme/pageTitle.vue";
import tabsSec from "@/components/sections/boards-committees/tabs.vue";

export default {
  components: {
    pageTitle,
    tabsSec
  }
};
</script>

<style>
</style>