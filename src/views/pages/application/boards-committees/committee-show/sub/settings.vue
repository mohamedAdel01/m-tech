<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="mb-0">{{$t('Committee Governance Settings')}}</h5>
    </div>
    <board-settings-sec />
  </div>
</template>

<script>
import boardSettingsSec from "@/components/sections/boards-committees/boardSettings.vue";

export default {
  components: {
    boardSettingsSec
  }
};
</script>

<style>
</style>