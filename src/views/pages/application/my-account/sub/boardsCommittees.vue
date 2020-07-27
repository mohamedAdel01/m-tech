<template>
  <div class="bg-light rounded p-3">
    <div
      v-for="(board, i) in baords"
      :key="i"
      @click="$router.push('/boards-committees/secretary-board-show/' + board.id + '/info')"
      class="d-flex pointer justify-content-between align-items-center bg-white rounded-pill p-3 mb-3"
    >
      <p class="mb-0 mx-3">{{board.translation.name}}</p>
      <div>◻</div>
    </div>
  </div>
</template>

<script>

import passwordForm from "@/components/forms/my-account/password.vue";
import mixins from '@/mixins';

export default {
  mixins: [mixins],
  components: {
    passwordForm
  },
  computed: {
    baords() {
      return this.$store.getters.boards
    }
  },
  created() {
    this.handleRequest("BOARDS_COMMITTEES", "BOARD_INDEX", null);
  }
};
</script>
