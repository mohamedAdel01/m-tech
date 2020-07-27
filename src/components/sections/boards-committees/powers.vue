<template>
  <section class="bg-light p-3 rounded mb-3">
    <div v-for="(authoritie,i) in board.authorities" :key="i" class="bg-white p-3 mb-3 rounded">
      <div class="mb-4">
        <div class="mb-3">
          <h6
            v-if="authoritie.committee_ids"
          >{{$t('Access to see all committees related to this board')}}</h6>
          <h6
            v-if="authoritie.meeting_ids"
          >{{$t('Access to see all meetings related to this board')}}</h6>
          <h6
            v-if="authoritie.action_ids"
          >{{$t('Access to see all decisions related to this board')}}</h6>
        </div>
        <div class="d-flex">
          <div class="d-flex">
            <div :class="['mx-2 circle border rounded-pill', authoritie.member_ids == 'ALL' ? 'bg-primary' : '' ]"></div>
            <p>{{$t('All members')}}</p>
          </div>
          <div class="d-flex mx-4">
            <div :class="['mx-2 circle border rounded-pill', authoritie.member_ids == 'ALL' ? '' : 'bg-primary' ]"></div>
            <p>{{$t('Some members')}}</p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <ul class="p-0">
            <li v-for="i in 2" :key="i" class="d-flex rounded-pill bg-light p-3 mb-2">
              <div class="col-6 px-2">member name</div>
              <div class="col-6 px-2">Independant</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    board() {
      return this.$store.getters.itemPreview;
    }
  }
};
</script>

<style lang="scss">
  .circle {
    width: 20px;
    height: 20px;
  }
</style>
