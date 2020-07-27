<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="mb-0">{{$t('Board permissions')}}</h5>
    </div>
    <add-terms-sec ref="termsSec" />

    <section class="actions text-right">
      <button class="btn btn-outline-danger rounded-pill px-3">{{$t('Cancel')}}</button>
      <button class="btn btn-secondary rounded-pill mx-3 px-4">{{$t('Previous')}}</button>
      <button class="btn btn-primary rounded-pill px-5" @click="next">{{$t('Next')}}</button>
    </section>
  </div>
</template>

<script>
import powersSec from "@/components/sections/boards-committees/powers.vue";
import addTermsSec from "@/components/sections/boards-committees/addTerms.vue";
import mixins from "@/mixins";

export default {
  mixins: [mixins],
  components: {
    powersSec,
    addTermsSec
  },
  methods: {
    next() {
      let form = this.$refs.termsSec.checkData();
      if (!form)
        return this.$toasted.error(this.$t("Please provide a valid data"));

      let board = {
        ...this.boardUnderUpdate,
        authorities: form
      };

      this.handleRequest("BOARDS_COMMITTEES", "UPDATE_BOARD", board).then(
        res => {
          this.$router.push(`/boards-committees`);
        }
      );
    }
  },
  computed: {
    boardUnderUpdate() {
      return this.$store.getters.boardUnderUpdate;
    }
  }
};
</script>
