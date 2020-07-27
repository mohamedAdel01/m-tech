<template>
  <section class="bg-primary p-3 rounded d-flex justify-content-between align-items-center mb-4">
    <div class="text-white">
      <h6 class="font-18">{{$t('Next meeting')}}:</h6>
      <p class="font-16">meeting name going to be here</p>
    </div>
    <div class="text-center">
      <p class="text-white font-16">{{$t('Next meeting after')}}</p>
      <div class="d-flex">
        <div class="text-center px-2">
          <div class="bg-white rounded p-4 h3">12</div>
          <p class="text-white font-14">{{$t('Day')}}</p>
        </div>
        <div class="text-center px-2">
          <div class="bg-white rounded p-4 h3">12</div>
          <p class="text-white font-14">{{$t('Hour')}}</p>
        </div>
        <div class="text-center px-2">
          <div class="bg-white rounded p-4 h3">12</div>
          <p class="text-white font-14">{{$t('Min')}}</p>
        </div>
      </div>
    </div>
    <div class="bg-white rounded p-3">
      <p>
        <calender-icon />
        <span class="px-2">mon 15 Aug 2020</span>
      </p>
      <p>
        <picker-icon />
        <span class="px-2">Meeting room</span>
      </p>
      <p>
        <clock-icon />
        <span class="px-2">from 2:00 am to 9:00 pm</span>
      </p>
    </div>
  </section>
</template>

<script>
import calenderIcon from "@/components/SVG/calender";
import clockIcon from "@/components/SVG/clock";
import pickerIcon from "@/components/SVG/picker";
export default {
  components: {
    calenderIcon,
    clockIcon,
    pickerIcon
  }
};
</script>

<style>
</style>