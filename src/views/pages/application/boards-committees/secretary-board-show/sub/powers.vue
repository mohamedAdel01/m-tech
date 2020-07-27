<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="mb-0">{{$t('Board permissions')}}</h5>
    </div>

    <powers-sec />
  </div>
</template>

<script>
import powersSec from "@/components/sections/boards-committees/powers.vue";

export default {
  components: {
    powersSec
  }
};
</script>
