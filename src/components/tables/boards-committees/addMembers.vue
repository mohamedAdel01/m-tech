<template>
  <ul class="p-0 mb-4" v-if="members.length">
    <li class="d-flex align-items-center bg-secondary py-2 px-4 mb-2 rounded-pill">
      <div class="col-4 px-0 py-1">{{$t('Name')}}</div>
      <div class="col-3 px-0 py-1 text-center">{{$t('Position')}}</div>
      <div class="col-3 px-0 py-1 text-center">{{$t('Membership')}}</div>
      <div class="col-2 px-0 py-1 text-center">{{$t('Options')}}</div>
    </li>

    <li
      v-for="(item, i) in members"
      :key="i"
      class="d-flex align-items-center py-2 px-4 mb-2 rounded-pill bg-light"
    >
      <div class="col-4 px-0 py-1">{{item.member.translation.name}}</div>
      <div class="col-3 px-0 py-1 text-center">{{item.position.name}}</div>
      <div class="col-3 px-0 py-1 text-center">{{item.membership.name}}</div>
      <div class="col-2 px-0 py-1 text-center">
        <img class="pointer" @click="$emit('removeMember', item)" src="@/assets/images/icons/bin.svg" />
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["members"]
};
</script>

<style>
</style>