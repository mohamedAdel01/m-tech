<template>
  <section class="d-flex flex-wrap mb-5">
    <div class="col-4 px-0">
      <h6>{{$t('Boards and Committees')}}</h6>
      <div class="bg-light rounded p-3 min-max-200">
        <div
          class="d-flex justify-content-between align-items-center bg-white px-3 py-3 my-2 rounded-pill"
        >
          <p class="mb-0">{{$t('Boards number')}}</p>
          <p class="mb-0">7</p>
        </div>
        <div
          class="d-flex justify-content-between align-items-center bg-white px-3 py-3 my-2 rounded-pill"
        >
          <p class="mb-0">{{$t('Committees number')}}</p>
          <p class="mb-0">7</p>
        </div>
        <div
          class="d-flex justify-content-between align-items-center bg-white px-3 py-3 my-2 rounded-pill"
        >
          <p class="mb-0">{{$t('Members number')}}</p>
          <p class="mb-0">7</p>
        </div>
      </div>
    </div>
    <div class="col-4 px-xl-2 px-0">
      <h6>{{$t('Members')}}</h6>
      <div class="bg-light rounded p-3 min-max-200">
        <div
          class="d-flex justify-content-between align-items-center bg-white px-3 py-1 my-2 rounded-pill"
        >
          <p class="mb-0">{{$t('Independents')}}</p>
          <vue-easy-pie-chart
            :percent="30"
            :size="42"
            font-size="12"
            :bar-color="settings.primary"
            animate
            :scale-color="settings.secondary"
          >7</vue-easy-pie-chart>
        </div>
        <div
          class="d-flex justify-content-between align-items-center bg-white px-3 py-1 my-2 rounded-pill"
        >
          <p class="mb-0">{{$t('Executives')}}</p>
          <vue-easy-pie-chart
            :percent="30"
            :size="42"
            font-size="12"
            :bar-color="settings.primary"
            animate
            :scale-color="settings.secondary"
          >7</vue-easy-pie-chart>
        </div>
        <div
          class="d-flex justify-content-between align-items-center bg-white px-3 py-1 my-2 rounded-pill"
        >
          <p class="mb-0">{{$t('Non-executives')}}</p>
          <vue-easy-pie-chart
            :percent="30"
            :size="42"
            font-size="12"
            :bar-color="settings.danger"
            animate
            :scale-color="settings.secondary"
          >7</vue-easy-pie-chart>
        </div>
      </div>
    </div>
    <div class="col-4 px-0">
      <h6>{{$t('Meetings')}}</h6>
      <div
        class="py-5 min-max-200 bg-light d-flex justify-content-center align-items-center rounded"
      >
        <div class="col-5 px-3 rounded text-center">
          <h6>{{$t('Boards')}}</h6>
          <div class="bg-white py-3 rounded">
            <p>3</p>
            <p>{{$t('Meetings')}}</p>
          </div>
        </div>
        <div class="col-5 px-3 rounded text-center">
          <h6>{{$t('Boards')}}</h6>
          <div class="bg-white py-3 rounded">
            <p>3</p>
            <p>{{$t('Meetings')}}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import VueEasyPieChart from "vue-easy-pie-chart";
import "vue-easy-pie-chart/dist/vue-easy-pie-chart.css";
export default {
  components: {
    VueEasyPieChart
  },
  computed: {
    settings() {
      return this.$store.getters.settings;
    }
  }
};
</script>

<style scoped>
.min-max-200 {
  min-height: 230px;
  max-height: 230px;
}
</style>