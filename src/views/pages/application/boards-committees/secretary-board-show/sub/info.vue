<template>
  <div id="info">
    <main-info-sec type="Board" />
    <meetings-sec v-if="board.meetings.length" />
  </div>
</template>

<script>
import mainInfoSec from "@/components/sections/boards-committees/mainInfo.vue";
import meetingsSec from "@/components/sections/boards-committees/meetings.vue";

export default {
  components: {
    mainInfoSec,
    meetingsSec
  },
  computed: {
    board() {
      return this.$store.getters.itemPreview;
    }
  }
};
</script>
