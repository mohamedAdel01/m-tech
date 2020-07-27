<template>
  <div data-aos="fade-down">
    <div class="d-flex align-items-center justify-content-center my-3" v-if="loading">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
    </div>
    <div v-if="board">
      <page-title mainTitle="Boards and Committees" :replacements="{'1': board.translation.name}" />
      <tabs-sec button="Edit board info" type="board" service="show" :id="board.id" />
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
    board() {
      return this.$store.getters.itemPreview;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  created() {
    this.handleRequest(
      "BOARDS_COMMITTEES",
      "BOARD_SHOW",
      this.$route.params.id
    );
  }
};
</script>
