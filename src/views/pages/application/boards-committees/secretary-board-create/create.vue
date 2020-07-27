<template>
  <div data-aos="fade-down">
    <page-title mainTitle="Boards and Committees" :replacements="{'1': $t('Add board')}" />
    <tabs-sec :title="$t('Add new board')" type="board" service="create" id="0" />
    <router-view data-aos="fade-right" />
  </div>
</template>

<script>
import mixins from "@/mixins";
import pageTitle from "@/components/theme/pageTitle.vue";
import tabsSec from "@/components/sections/boards-committees/tabs.vue";

export default {
  mixins: [mixins],
  components: {
    pageTitle,
    tabsSec
  },
  created() {
    this.handleRequest(
      "COMMON",
      "RESOURCES",
      "nationalities,roles,users,positions,memberships,boards_configurations"
    );
  },
  beforeDestroy() {
    this.$store.dispatch("STORE_SAVE", {
      moduleName: "boards_committees",
      key: "boardUnderUpdate",
      value: null
    });
    sessionStorage.clear();
  }
};
</script>
