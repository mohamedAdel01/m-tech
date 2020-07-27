<template>
  <section class="d-flex align-items-center bg-primary rounded mb-3 p-3">
    <div class="p-2 col-4">
      <h6 class="text-white">{{$t('Meetings')}}</h6>
      <div class="bg-white rounded w-100 p-2">
        <meetings-chart :width="250" :height="250" />
      </div>
    </div>
    <div class="p-2 col-4">
      <h6 class="text-white">{{$t('Missions')}}</h6>
      <div class="bg-white rounded w-100 p-2">
        <missions-chart :width="250" :height="250" />
      </div>
    </div>
    <div class="p-2 col-4">
      <h6 class="text-white">{{$t('Completed decissions')}}</h6>
      <div class="bg-white rounded w-100 p-2">
        <missions-chart :width="250" :height="250" />
      </div>
    </div>
  </section>
</template>

<script>
import meetingsChart from "@/components/charts/meetings.vue";
import missionsChart from "@/components/charts/missions.vue";
export default {
  components: {
    meetingsChart,
    missionsChart
  }
};
</script>

<style>
</style>