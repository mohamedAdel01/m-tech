<template>
  <section class="w-100">
    <div class="d-flex justify-content-between mb-2">
      <h6 class="mb-0">{{$t('Missions assigned to me')}}</h6>
      <button class="btn btn-link p-0 font-14 text-black-50">{{$t('Show more')}}</button>
    </div>
    <div class="bg-light rounded p-3">
      <div v-for="(task,index) in tasks" :key="index" class="bg-white rounded p-3 mb-3">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h6 class="mb-0">
            <router-link class="font-18 text-dark" to="/">{{task.title}}</router-link>
          </h6>
          <div class="d-flex align-items-center">
            <!-- <p
              class="bg-light font-14 rounded-pill mx-3 mb-0 p-1 text-black-50 overflow-hidden d-flex align-items-center"
            >
              <span class="px-3 font-weight-bold">{{$t('Achievement rate')}}</span>
              <span class="bg-secondary rounded-circle percent font-weight-bold d-block">95%</span>
            </p> -->
            <eye-icon class="pointer" v-b-tooltip.hover :title="$t('View mission')" />
          </div>
        </div>
        <div class="bg-white rounded mb-2">
          <div class="d-flex mb-3">
            <!-- <div class="py-1">
              <p class="mb-0 px-2 text-black-50 font-14">{{$t('Related to')}}</p>
              <p class="mb-0 px-2 font-16">meeting room</p>
            </div> -->
            <div class="py-1 px-3 mx-3 border-left">
              <p class="mb-0 px-2 text-black-50 font-14">{{$t('Decission date')}}</p>
              <p class="mb-0 px-2 font-16">{{task.due_date}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import eyeIcon from "@/components/SVG/eye";
export default {
  components: {
    eyeIcon
  },
  props: ['tasks']
};
</script>

<style lang="scss" scoped>
.percent {
  padding: 8px 5px;
}
</style>