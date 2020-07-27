<template>
  <div class="home" data-aos="fade-down">
  <!--
    <charts-sec />
    -->
    <div class="d-flex align-items-center justify-content-center my-3" v-if="loading">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
    </div>
    <template v-if="!loading">
    <next-meeting-sec />
    <div class="d-flex flex-wrap mb-4" >
      <ongoing-meetings-sec :meetings="meetings" />
      <decissions-under-voting-sec :actions="actions.filter(a => a.status == 1)" />
    </div>
    <div>
      <missions :tasks="tasks.filter(t => t.status !== 0)"/>
    </div>
    </template>
  </div>
</template>

<script>
import chartsSec from "@/components/sections/home/charts";
import nextMeetingSec from "@/components/sections/home/nextMeeting";
import ongoingMeetingsSec from "@/components/sections/home/ongoingMeetings";
import decissionsUnderVotingSec from "@/components/sections/home/decissionsUnderVoting";
import missions from "@/components/sections/home/missions";
import mixins from '@/mixins'

export default {
  mixins: [mixins],
  components: {
    chartsSec,
    nextMeetingSec,
    ongoingMeetingsSec,
    decissionsUnderVotingSec,
    missions
  },
  computed:{
    meetings(){
      return this.$store.getters.meetings
    },
    actions(){
      return this.$store.getters.actions
    },
    tasks(){
      return this.$store.getters.tasks
    },
    loading(){
      return this.$store.getters.loading
    }
  },
  mounted(){
      this.handleRequest('MEETINGS','SHOW_MEETINGS')
      this.handleRequest('MEETINGS','SHOW_ACTIONS')
      this.handleRequest('MEETINGS','SHOW_TASKS')
  }
};
</script>
