<template>
  <ul class="p-0 mb-4">
    <li class="d-flex align-items-center bg-secondary py-2 px-4 mb-2 rounded-pill">
      <div class="col-2 px-0 py-1">{{$t('Meeting number')}}</div>
      <div class="col-4 px-0 py-1 text-center">{{$t('Meeting title')}}</div>
      <div class="col-4 px-0 py-1 text-center">{{$t('Date/time Meeting')}}</div>
      <div class="col-2 px-0 py-1 text-right">{{$t('Meeting status')}}</div>
    </li>

    <li
      v-for="(meeting, i) in board.meetings"
      :key="i"
      class="d-flex align-items-center bg-white py-2 px-4 mb-2 rounded-pill"
    >
      <div class="col-2 px-4">{{meeting.number}}</div>
      <div class="col-4 p-0 text-center">{{meeting.title}}</div>
      <div
        class="col-4 p-0 text-center"
      >{{meeting.start_at.gregorian.date}} {{meeting.start_at.gregorian.time}}</div>
      <div class="col-2 p-0 text-left">
        <h5 class="text-right px-3">
          <b-badge
            :class="['rounded-pill px-3 py-1 font-weight-light', 'status' + meeting.status]"
          >{{$t('status' + meeting.status)}}</b-badge>
        </h5>
      </div>
    </li>
  </ul>
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

<style lang="scss" scoped>
.status0 {
  background: var(--secondary-color);
}
.status1 {
  background: var(--primary-color);
}
</style>
