<template>
  <section class="col-6 pl-0 pr-3">
    <div class="d-flex justify-content-between mb-2">
      <h6 class="mb-0">{{$t('Ongoing meetings')}}</h6>
      <button class="btn btn-link p-0 font-14 text-black-50">{{$t('Show more')}}</button>
    </div>
    <div class="bg-light rounded p-3">
      <div v-for="(meeting,index) in meetings" :key="index" class="bg-white rounded p-3 mb-3">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h6 class="mb-0">
            <router-link class="text-dark font-18" to="meetings/show/1">{{meeting.title}}</router-link>
          </h6>
          <div class="d-flex align-items-center">
            <meeting-time-icon class="pointer" v-b-tooltip.hover :title="$t('Name')"/>
          </div>
        </div>
        <div class="bg-white rounded mb-2">
          <div class="d-flex mb-3">
            <div class="d-flex py-1">
              <p class="mb-0">
                <calender-icon />
                <span class="px-2 font-14">{{meeting.start_at.full}}</span>
              </p>
            </div>
            <div class="d-flex py-1 px-3 mx-3 border-right border-left">
              <p class="mb-0">
                <clock-icon />
                <span class="px-2 font-14">from {{meeting.start_at.full}} to {{meeting.end_at.full}}</span>
              </p>
            </div>
            <div class="d-flex flex-wrap py-1">
              <p class="mb-0">
                <picker-icon />
                <span class="px-2 font-14" v-if="meeting.location">{{meeting.location.name}}</span>
              </p>
            </div>
          </div>
          <div class="text-right">
            <button class="btn btn-primary rounded-pill px-3 font-12">{{$t('Join meeting')}}</button>
          </div>
        </div>
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
  props:['meetings']
};
</script>
