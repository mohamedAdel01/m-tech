<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="mb-0">{{$t('Board Governance Settings')}}</h5>
    </div>

    <board-add-settings-sec ref="boardAddSettingsSec" />

    <section class="actions text-right mt-3">
      <button class="btn btn-outline-danger rounded-pill px-3">{{$t('Cancel')}}</button>
      <button class="btn btn-secondary rounded-pill mx-3 px-4">{{$t('Previous')}}</button>
      <button class="btn btn-primary rounded-pill px-5" @click="next">{{$t('Next')}}</button>
    </section>
  </div>
</template>

<script>
import mixins from "@/mixins";
import boardAddSettingsSec from "@/components/sections/boards-committees/boardAddSeetings.vue";

export default {
  mixins: [mixins],
  components: {
    boardAddSettingsSec
  },
  methods: {
    next() {
      let board = this.$refs.boardAddSettingsSec.checkData();
      this.handleRequest("BOARDS_COMMITTEES", "UPDATE_BOARD", board).then(
        res => {
          this.$router.push(
            "/boards-committees/secretary-board-create/0/members"
          );
        }
      );
    }
  }
};
</script>
