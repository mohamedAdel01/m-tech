<template>
  <div id="meeting-create" class="mb-5" data-aos="fade-down">
    <page-title mainTitle="Meetings" secTitle="Add new meeting" />

    <section class="meeting-info" data-aos="fade-right">
      <h5 class="font-18">{{$t('Meeting Info')}}</h5>
      <div class="bg-light p-4 rounded">
        <meeting-info @suggestion="suggestion = $event" ref="meetingInfoForm" />
      </div>
    </section>

    <section class="mt-5 d-flex justify-content-end" v-show="suggestion">
      <button class="btn btn-primary rounded-pill d-flex align-items-center">
        <send-invitation-icon />
        <span class="mx-3 font-14" @click="sendSuggestions">{{$t('Send suggestions to members')}}</span>
      </button>
    </section>

    <section class="mt-5" v-show="!suggestion">
      <organizers-sec
        :organizers="form.organizers"
        @setOrganizers="setOrganizers($event)"
        @deleteOrganizer="deleteOrganizer($event)"
      />
      <agendas-sec @addAgenda="form.agendas=$event" />
      <attachments-sec
        @attachmentUploaded="attachmentUploaded($event)"
        :attachments="form.attachments"
      />
      <attendees-sec
        ref="attendeesSection"
        :attendees="form.attendees"
        :agendas="form.agendas"
        @addAboardMembers="addAboardMembers($event)"
      />

      <div class="actions text-right">
        <button class="btn btn-link text-danger rounded-pill">{{$t('Cancel')}}</button>
        <button class="btn btn-secondary rounded-pill mx-3">{{$t('Save as a draft')}}</button>
        <button
          class="btn btn-primary rounded-pill"
          @click="collectAndSubmitMeetingData"
        >{{$t('Publish meeting')}}</button>
      </div>
    </section>
  </div>
</template>

<script>
import pageTitle from "@/components/theme/pageTitle.vue";
import meetingInfo from "@/components/forms/meetings/meetingInfo.vue";
import organizersSec from "@/components/sections/meetings/organizersCreate.vue";
import agendasSec from "@/components/sections/meetings/agendas.vue";
import attachmentsSec from "@/components/sections/meetings/attachments.vue";
import attendeesSec from "@/components/sections/meetings/attendees.vue";
import sendInvitationIcon from "@/components/SVG/sendInvitation.vue";
import mixins from "@/mixins";
export default {
  mixins: [mixins],
  components: {
    pageTitle,
    meetingInfo,
    organizersSec,
    agendasSec,
    attachmentsSec,
    attendeesSec,
    sendInvitationIcon
  },
  data() {
    return {
      suggestion: false,
      form: {
        attachments: [],
        organizers: [],
        attendees: [],
        agendas: []
      },
      submitData: {}
    };
  },
  methods: {
    deleteOrganizer(id) {
      this.form.organizers.organizers = this.form.organizers.organizers.filter(o => o.id != id)
    },
    sendSuggestions() {
      let form = this.$refs.meetingInfoForm.checkData();
      if (!form)
        return this.$toasted.error(this.$t("Please provide a valid data"));
      this.handleRequest("MEETINGS", "CREATE_MEETING_SUGGESSTION", form).then(
        res => {
          this.$router.push(`/meetings`);
        }
      );
    },
    attachmentUploaded(res) {
      this.form.attachments.push(this.$store.getters.uploadedFile);
    },
    addAboardMembers(members){
      this.form.attendees = [...this.form.attendees,...members]

    },
    collectAndSubmitMeetingData(){

        let meetingInfoForm = this.$refs.meetingInfoForm.checkData();

        meetingInfoForm.start_at = this.$moment(String(new Date(meetingInfoForm.start_at))).format('YYYY\/MM\/DD hh:mm')
        meetingInfoForm.end_at = this.$moment(String(new Date(meetingInfoForm.end_at))).format('YYYY\/MM\/DD hh:mm')
        this.submitData = meetingInfoForm

        if(this.form.organizers.organizers != undefined && this.form.organizers.organizers.length > 0){

            let organizerObject
            organizerObject = this.form.organizers.organizers.map(o => {
              let formatedOrganizerObject = {}
              formatedOrganizerObject.member_id = o.id
              formatedOrganizerObject.capabilities = (o.capabilities !=undefined&&o.capabilities.length)?o.capabilities.join(','):""
              formatedOrganizerObject.expires_at = this.$moment(String(new Date(this.form.organizers.expireDate))).format('YYYY\/MM\/DD hh:mm')
              return formatedOrganizerObject
            })

          this.submitData.organizers = organizerObject
        }else{
          this.submitData.organizers = []
        }
    },
    setOrganizers(organizersObject) {
      this.form.organizers = organizersObject;
    },
    addAboardMembers(members) {
      this.form.attendees = [...this.form.attendees, ...members];
    },
    collectAndSubmitMeetingData() {
      let meetingInfoForm = this.$refs.meetingInfoForm.checkData();

      meetingInfoForm.start_at = this.$moment(
        String(new Date(meetingInfoForm.start_at))
      ).format("YYYY/MM/DD hh:mm");
      meetingInfoForm.end_at = this.$moment(
        String(new Date(meetingInfoForm.end_at))
      ).format("YYYY/MM/DD hh:mm");
      this.submitData = meetingInfoForm;

      if (
        this.form.organizers.organizers != undefined &&
        this.form.organizers.organizers.length > 0
      ) {
        let organizerObject;
        organizerObject = this.form.organizers.organizers.map(o => {
          let formatedOrganizerObject = {};
          formatedOrganizerObject.member_id = o.id;
          formatedOrganizerObject.capabilities =
            o.capabilities != undefined && o.capabilities.length
              ? o.capabilities.join(",")
              : "";
          formatedOrganizerObject.expires_at = this.$moment(
            String(new Date(this.form.organizers.expireDate))
          ).format("YYYY/MM/DD hh:mm");
          return formatedOrganizerObject;
        });

        this.submitData.organizers = organizerObject;
      } else {
        this.submitData.organizers = [];
      }

      this.submitData.committee_id = this.submitData.committee.id;
      this.submitData.location_id = this.submitData.location
        ? this.submitData.location.id
        : 1;

      delete this.submitData.location;
      delete this.submitData.committee;

      this.submitData.agendas = this.form.agendas.map(agenda => {
        let formatedAgenda = {};
        formatedAgenda.title = agenda.title;
        formatedAgenda.brief = agenda.brief;
        formatedAgenda.assignee_id = agenda.assignee_id.id;
        formatedAgenda.duration = agenda.duration;
        formatedAgenda.is_work_agenda = agenda.is_work_agenda;
        formatedAgenda.has_hidden_voting = agenda.has_hidden_voting;
        formatedAgenda.has_visible_voting = agenda.has_visible_voting;
        formatedAgenda.can_acccess_list =
          agenda.aboardMembersCanView.length > 0
            ? agenda.aboardMembersCanView.join(",") +
              "," +
              agenda.membersCanView.join(",")
            : agenda.membersCanView.join(",");
        formatedAgenda.attachments = agenda.attachments.map(a => {
          let file = {};
          file.title = a.title;
          file.media_id = a.id;
          return file;
        });
        formatedAgenda.has_voting = agenda.has_voting;

        return formatedAgenda;
      });

      if (this.form.attachments.length > 0) {
        this.submitData.attachments = this.form.attachments.map(a => {
          let file = {};
          file.title = "test";
          file.media_id = a.id;
          return file;
        });
      } else {
        this.submitData.attachments = [];
      }

      this.submitData.attendees = this.form.attendees.reduce((a, b) => {
        a.push({
          member_id: b.member_id,
          position_id: b.position_id,
          can_acccess_list: "ALL"
        });
        return a;
      }, []);

      // let attendees = this.$refs.attendeesSection.getAttendees().map(a => {
      //     let attendee = {}
      //     attendee.member_id = a.member_id
      //     attendee.position_id = 1
      //     attendee.can_acccess_list = "ALL"
      //     return attendee
      // })

      // this.submitData.attendees = attendees

      let finalData = this.submitData;
      this.handleRequest("MEETINGS", "CREATE_MEETING", finalData).then(res => {
        if (res == "success") {
          let createdMeetingId = this.$store.getters.meeting.id;
          this.$router.push(`/meetings/show/${createdMeetingId}`);
        }
      });
    }
  },
  computed: {
    selectedBoardMembers() {
      return this.$store.getters.boardMembers;
    }
  },
  watch: {
    selectedBoardMembers: {
      immediate: true,
      handler(val) {
        this.form.attendees = val;
      }
    }
  },
  async created() {
    await this.$store.dispatch("TENENTDATA", {
      service: "GET_MEMBERS",
      reqPayload: null
    });

    this.handleRequest(
      "COMMON",
      "RESOURCES",
      "actions_types,capabilities,locations,users,boards,languages,nationalities,roles"
    );
  }
};
</script>
