<template>
  <section class="bg-white rounded p-3 mb-3">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h6 class="mb-0">
        <router-link class="text-dark font-18" :to="`meetings/show/${meeting.id}`">{{meeting.title}}
        <span v-if="meeting.type == 'time'">({{$t('Voting')}})</span>
        </router-link>
      </h6>
      <div class="d-flex align-items-center">
        <p class="mb-0 rounded-pill bg-secondary px-3 py-1 mx-3 text-dark">{{meeting.status}}</p>
        <div class="d-flex align-items-center">
          <meeting-time-icon class="pointer" v-b-tooltip.hover :title="$t('Name')" />
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-between align-items-center bg-white rounded mb-2">
      <div class="d-flex mb-3">
        <div v-if="meeting.type == 'meeting'" class="d-flex py-1">
          <p class="mb-0">
            <calender-icon />
            <span class="px-2 font-14">{{meeting.start_at.full}}</span>
          </p>
        </div>
        <div v-if="meeting.type == 'meeting'" class="d-flex py-1 px-3 mx-3 border-right border-left">
          <p class="mb-0">
            <clock-icon />
            <span class="px-2 font-14">from {{meeting.start_at.full}} to {{meeting.end_at.full}}</span>
          </p>
        </div>
        <div class="d-flex flex-wrap py-1">
          <p class="mb-0">
            <picker-icon />
            <span class="px-2 font-14"></span>
          </p>
        </div>
      </div>
      <div v-if="false">
        <button class="btn btn-primary rounded-pill px-3">dynamic button</button>
      </div>
    </div>
  </section>
</template>

<script>
import meetingTimeIcon from "@/components/SVG/meetingTime";
import calenderIcon from "@/components/SVG/calender";
import clockIcon from "@/components/SVG/clock";
import pickerIcon from "@/components/SVG/picker";
export default {
  components: {
    meetingTimeIcon,
    calenderIcon,
    clockIcon,
    pickerIcon
  },
  props:['meeting']
};
</script>

<style>
</style>