<template>
  <section class="mb-3">
    <div class="mb-3">
      <h5>{{$t(type + ' info')}}</h5>
    </div>
    <div class="bg-light p-3 rounded mb-3">
      <h5 class="font-18">{{board.translation.name}}</h5>
      <div class="d-flex py-2">
        <div class="d-flex py-1">
          <p class="mb-0 text-black-50">{{$t('Board duration')}}:</p>
          <p
            class="mb-0 px-2"
          >{{board.is_permanent ? $t('Permenant board') : $t('Temporary board')}}</p>
        </div>
        <template v-if="!board.is_permanent">
          <div class="d-flex py-1 px-3 mx-3 border-right border-left">
            <p class="mb-0 text-black-50">{{$t('Start date')}}:</p>
            <p class="mb-0 px-2">{{board.start_at.gregorian.date}}</p>
          </div>
          <div class="d-flex py-1">
            <p class="mb-0 text-black-50">{{$t('End date')}}:</p>
            <p class="mb-0 px-2">{{board.end_at.gregorian.date}}</p>
          </div>
        </template>
      </div>
    </div>

    <div class="bg-light p-3 rounded mb-3" v-if="board.medias.length">
      <h6 class="mb-3">{{$t(type + ' Regulation')}}</h6>
      <div class="d-flex justify-content-between align-items-center bg-white p-3 rounded-pill my-2">
        <p class="mb-0">FileONe.pdf</p>
      </div>
    </div>

    <div class="bg-light p-3 rounded" v-if="type=='Board' && board.committees.length">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="mb-0">{{$t('Board committees')}}</h6>
        <p class="mb-0">{{board.committees.length}} {{$t('Committees')}}</p>
      </div>

      <div v-for="(committee, i) in board.committees" :key="i" class="bg-white p-3 rounded mb-3">
        <h6>{{committee.translation.name}}</h6>
        <div class="d-flex py-2">
          <div class="d-flex py-1">
            <p class="mb-0 text-black-50">{{$t('Duration')}}:</p>
            <p class="mb-0 px-2">missing</p>
          </div>
          <div class="d-flex py-1 px-3 mx-3 border-left">
            <p class="mb-0 text-black-50">{{$t('Members number')}}:</p>
            <p class="mb-0 px-2">missing</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["type"],
  computed: {
    board() {
      return this.$store.getters.itemPreview;
    }
  }
};
</script>
