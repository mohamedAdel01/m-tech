<template>
  <ul class="p-0 mb-4">
    <li class="d-flex align-items-center bg-secondary py-2 px-4 mb-2 rounded-pill">
      <div class="col-3 px-0 py-1">{{$t('Name')}}</div>
      <div class="col-3 px-0 py-1 text-center">{{$t('Position')}}</div>
      <div class="col-3 px-0 py-1 text-center">{{$t('Membership')}}</div>
      <div class="col-3 px-0 py-1 text-center">{{$t('Joining date')}}</div>
    </li>

    <li
      v-for="(member,i) in board.members"
      :key="i"
      class="d-flex align-items-center bg-white py-2 px-4 mb-2 rounded-pill"
    >
      <div class="col-3 px-4 py-1">{{member.member.translation.title}} {{member.member.translation.name}}</div>
      <div class="col-3 px-0 py-1 text-center">{{member.position.name}}</div>
      <div class="col-3 px-0 py-1 text-center">{{member.membership.name}}</div>
      <div class="col-3 px-0 py-1 text-center">missing</div>
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

<style>
</style>