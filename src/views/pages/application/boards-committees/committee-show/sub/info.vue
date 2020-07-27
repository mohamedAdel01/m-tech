<template>
  <div id="info">
    <main-info-sec type="Committee" />
    <meetings-sec/>
  </div>
</template>

<script>
import mainInfoSec from "@/components/sections/boards-committees/mainInfo.vue";
import meetingsSec from '@/components/sections/boards-committees/meetings.vue';

export default {
  components: {
    mainInfoSec,
    meetingsSec
  }
};
</script>

<style>
</style>