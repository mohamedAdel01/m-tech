<template>
  <div id="meeting-show" class="mb-5" data-aos="fade-down" v-if="meeting">
    <page-title
      :mainTitle="meeting.title"
      titleColor="text-primary"
      status="Draft"
      :replacements="{'1': 'meeting name'}"
    />
    {{(openVotingModal==true)?'test':'test1'}}
    <attendees-sec :attendees="form.attendees" :agendas="form.agendas"  @addAboardMembers="addAboardMembers($event)"  />
    <organizers-sec :organizers="meeting.organizers" />
    <meeting-info-sec :meeting="meeting" />
    <agendas-sec ref="agendasSection" :agendasData="form.agendas" />
    <attachments-sec :attachments="form.attachments" />
  </div>
</template>

<script>
import pageTitle from "@/components/theme/pageTitle.vue";
import organizersSec from "@/components/sections/meetings/organizers.vue";
import agendasSec from "@/components/sections/meetings/agendas.vue";
import attachmentsSec from "@/components/sections/meetings/attachments.vue";
import attendeesSec from "@/components/sections/meetings/attendees.vue";
import meetingInfoSec from "@/components/sections/meetings/meetingInfo.vue";
import mixins from "@/mixins";
export default {
  mixins: [mixins],
  components: {
    pageTitle,
    organizersSec,
    agendasSec,
    attachmentsSec,
    attendeesSec,
    meetingInfoSec
  },
  mounted(){
    let id = this.$route.params.id
    this.handleRequest('MEETINGS','SHOW_MEETING',id)
    this.handleRequest(
      "COMMON",
      "RESOURCES",
      "actions_types,capabilities,locations,users,boards,languages,nationalities,roles"
    );
  },
  data(){
    return {
      form: {
        attachments: [],
        organizers: [],
        attendees: [],
        agendas: []
      }
    }
  },
  watch: {
    meeting: {
      immediate: true,
      handler(val) {
        if (!val) return;
        this.form.agendas = val.agendas;
        this.form.organizers = val.organizers;
        this.form.attendees = val.attendees;
        this.form.attachments = val.attachments;
      }
    }
  },
  methods: {
    addAboardMembers(members){
      this.form.attendees = [...this.form.attendees,...members]
    }
  },
  computed:{
    meeting(){
      return this.$store.getters.meeting
    },
    loading() {
      return this.$store.getters.loading
    },
    openVotingModal() {
      return this.$store.getters.openVotingModel
    }
  }
};
</script>

<style lang="scss">
#meeting-show {
}
</style>