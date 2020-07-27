<template>
  <div id="info">
    <h5 class="mb-3 font-16">{{$t('Board info')}}</h5>
    <section class="bg-light p-3 rounded mb-4">
      <info-form ref="infoForm" />
    </section>

    <section class="actions text-right">
      <router-link
        to="/boards-committees"
        class="btn btn-outline-danger rounded-pill px-3 mx-3"
      >{{$t('Cancel')}}</router-link>
      <button class="btn btn-primary rounded-pill px-5" @click="next">{{$t('Next')}}</button>
    </section>
  </div>
</template>

<script>
import mixins from "@/mixins";
import infoForm from "@/components/forms/boards-committees/info.vue";

export default {
  mixins: [mixins],
  computed: {
    boardUnderUpdate() {
      return this.$store.getters.boardUnderUpdate;
    }
  },
  methods: {
    next() {
      let form = this.$refs.infoForm.checkData();
      if (!form)
        return this.$toasted.error(this.$t("Please provide a valid data"));
      let service = "CREATE_BOARD";
      if (this.boardUnderUpdate) service = "UPDATE_BOARD";
      this.handleRequest("BOARDS_COMMITTEES", service, form).then(res => {
        this.$router.push("/boards-committees/secretary-board-create/0/settings");
      });
    }
  },
  components: {
    infoForm
  }
};
</script>
