<template>
  <div class="home" data-aos="fade-down">
    <page-title mainTitle="Boards and Committees" />
    <summary-info-sec />
    <boards-committees-sec data-aos="fade-right" />
  </div>
</template>

<script>
import mixins from "@/mixins";
import pageTitle from "@/components/theme/pageTitle.vue";
import boardsCommitteesSec from "@/components/sections/boards-committees/boardsCommittees.vue";
import summaryInfoSec from "@/components/sections/boards-committees/summaryInfo.vue";

export default {
  mixins: [mixins],
  components: {
    pageTitle,
    summaryInfoSec,
    boardsCommitteesSec
  },
  created() {
    this.handleRequest("BOARDS_COMMITTEES", "BOARD_INDEX", null);
  }
};
</script>
