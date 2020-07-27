<template>
  <div data-aos="fade-down">
    <page-title mainTitle="Boards and Committees" :replacements="{'1': $t('Add board')}" />
    <tabs-sec :title="$t('Update board')" type="board" service="update" :id="$route.params.id" />
    <div class="d-flex align-items-center justify-content-center my-3" v-if="loading">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
    </div>
    <div v-if="!loading && boardUnderUpdate">
      <router-view data-aos="fade-right" />
    </div>
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
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    boardUnderUpdate() {
      return this.$store.getters.boardUnderUpdate;
    }
  },
  created() {
    this.handleRequest(
      "COMMON",
      "RESOURCES",
      "nationalities,roles,users,positions,memberships,boards_configurations"
    );

    this.handleRequest(
      "BOARDS_COMMITTEES",
      "BOARD_SHOW",
      this.$route.params.id
    ).then(res => this.handleBoardUnderUpdateData(res));
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
