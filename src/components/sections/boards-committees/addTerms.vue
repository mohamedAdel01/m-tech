<template>
  <section class="mb-4">
    <div class="bg-light rounded p-3">
      <div
        :class="['rounded p-3 mb-2', committeesAuthoritiesEnabled ? 'bg-white' : 'bg-secondary text-black-50' ]"
      >
        <div class="d-flex justify-content-between align-items-center mb-2">
          <p class="mb-0">{{$t('Access to see all committees related to this board')}}</p>
          <toggle-button
            :width="45"
            :height="25"
            color="var(--primary-color)"
            v-model="committeesAuthoritiesEnabled"
          />
        </div>
        <div
          v-if="committeesAuthoritiesEnabled"
          class="d-flex justify-content-between align-items-center"
        >
          <div class="d-flex">
            <b-form-radio
              v-model="allCanViewCommittees"
              name="allCanViewCommittees"
              :value="true"
            >{{$t('All members')}}</b-form-radio>
            <b-form-radio
              v-model="allCanViewCommittees"
              name="allCanViewCommittees"
              :value="false"
              class="mx-4"
            >{{$t('Some members')}}</b-form-radio>
          </div>
        </div>
        <div v-if="!allCanViewCommittees" class="form-group col-md-6 col-12 px-2">
          <span class="d-inline-block font-13">{{ $t('Position') }}</span>
          <v-select
            id="vselect"
            label="name"
            multiple
            v-model="membersCanViewCommittees"
            :get-option-label="option => option.translation.name"
            :reduce="user => user.id"
            :options="resources.users"
          />
        </div>
      </div>
      <div
        :class="['rounded p-3 mb-2', meetingsAuthoritiesEnabled ? 'bg-white' : 'bg-secondary text-black-50' ]"
      >
        <div class="d-flex justify-content-between align-items-center mb-2">
          <p class="mb-0">{{$t('Access to see all meetings related to this board')}}</p>
          <toggle-button
            :width="45"
            :height="25"
            color="var(--primary-color)"
            v-model="meetingsAuthoritiesEnabled"
          />
        </div>
        <div
          v-if="meetingsAuthoritiesEnabled"
          class="d-flex justify-content-between align-items-center"
        >
          <div class="d-flex">
            <b-form-radio
              v-model="allCanViewMeetings"
              name="allCanViewMeetings"
              :value="true"
            >{{$t('All members')}}</b-form-radio>
            <b-form-radio
              v-model="allCanViewMeetings"
              name="allCanViewMeetings"
              :value="false"
              class="mx-4"
            >{{$t('Some members')}}</b-form-radio>
          </div>
        </div>
        <div v-if="!allCanViewMeetings" class="form-group col-md-6 col-12 px-2">
          <span class="d-inline-block font-13">{{ $t('Position') }}</span>
          <v-select
            id="vselect"
            label="name"
            multiple
            v-model="membersCanViewMeetings"
            :get-option-label="option => option.translation.name"
            :reduce="user => user.id"
            :options="resources.users"
          />
        </div>
      </div>
      <div
        :class="['rounded p-3 mb-2', actionsAuthoritiesEnabled ? 'bg-white' : 'bg-secondary text-black-50' ]"
      >
        <div class="d-flex justify-content-between align-items-center mb-2">
          <p class="mb-0">{{$t('Access to see all decisions related to this board')}}</p>
          <toggle-button
            :width="45"
            :height="25"
            color="var(--primary-color)"
            v-model="actionsAuthoritiesEnabled"
          />
        </div>
        <div
          v-if="actionsAuthoritiesEnabled"
          class="d-flex justify-content-between align-items-center"
        >
          <div class="d-flex">
            <b-form-radio
              v-model="allCanViewActions"
              name="allCanViewActions"
              :value="true"
            >{{$t('All members')}}</b-form-radio>
            <b-form-radio
              v-model="allCanViewActions"
              name="allCanViewActions"
              :value="false"
              class="mx-4"
            >{{$t('Some members')}}</b-form-radio>
          </div>
        </div>
        <div v-if="!allCanViewActions" class="form-group col-md-6 col-12 px-2">
          <span class="d-inline-block font-13">{{ $t('Position') }}</span>
          <v-select
            id="vselect"
            label="name"
            multiple
            v-model="membersCanViewActions"
            :get-option-label="option => option.translation.name"
            :reduce="user => user.id"
            :options="resources.users"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ToggleButton } from "vue-js-toggle-button";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { boardAuthoritiesValidation } from "@/constants/validation.js";
import { validationMixin } from "vuelidate";

export default {
  components: {
    vSelect,
    ToggleButton
  },
  mixins: [validationMixin],
  data() {
    return {
      allCanViewCommittees: true,
      allCanViewMeetings: true,
      allCanViewActions: true,
      committeesAuthoritiesEnabled: false,
      meetingsAuthoritiesEnabled: false,
      actionsAuthoritiesEnabled: false,
      membersCanViewCommittees: [],
      membersCanViewMeetings: [],
      membersCanViewActions: [],
      authorities: [
        {
          member_ids: "",
          committee_ids: "ALL"
        },
        {
          member_ids: "",
          meeting_ids: "ALL"
        },
        {
          member_ids: "",
          action_ids: "ALL"
        }
      ]
    };
  },
  watch: {
    boardUnderUpdate: {
      immediate: true,
      handler(val) {
        if(val.authorities){
          this.authorities = val.authorities;
          this.committeesAuthoritiesEnabled = val.committeesAuthoritiesEnabled;
          this.meetingsAuthoritiesEnabled = val.meetingsAuthoritiesEnabled;
          this.actionsAuthoritiesEnabled = val.actionsAuthoritiesEnabled;
          this.allCanViewCommittees = val.allCanViewCommittees;
          this.allCanViewMeetings = val.allCanViewMeetings;
          this.allCanViewActions = val.allCanViewActions;
        }
      }
    },
    resources: {
      immediate: true,
      handler(val) {
        if(val !== null){
          this.membersCanViewMeetings = val.users.filter(user =>
          this.boardUnderUpdate.membersCanViewMeetings.includes(
            JSON.stringify(user.id)
          )
        );

        this.membersCanViewActions = val.users.filter(user =>
          this.boardUnderUpdate.membersCanViewActions.includes(
            JSON.stringify(user.id)
          )
        );
        }
        
      }
    },
    allCanViewCommittees: {
      immediate: true,
      handler(val) {
        if (val) this.authorities[0].member_ids = "ALL";
        else this.setMembersCanView(0);
      }
    },
    allCanViewMeetings: {
      immediate: true,
      handler(val) {
        if (val) this.authorities[1].member_ids = "ALL";
        else this.setMembersCanView(1);
      }
    },
    allCanViewActions: {
      immediate: true,
      handler(val) {
        if (val) this.authorities[2].member_ids = "ALL";
        else this.setMembersCanView(2);
      }
    }
  },
  methods: {
    setMembersCanView(key) {
      switch (key) {
        case 0:
          this.authorities[key].member_ids =
            this.membersCanViewCommittees.length > 0
              ? this.membersCanViewCommittees.join(",")
              : "";
          break;
        case 1:
          this.authorities[key].member_ids =
            this.membersCanViewMeetings.length > 0
              ? this.membersCanViewMeetings.join(",")
              : "";
          break;
        case 2:
          this.authorities[key].member_ids =
            this.membersCanViewActions.length > 0
              ? this.membersCanViewActions.join(",")
              : "";
          break;
      }
    },
    formatAuthoritiesData() {
      if (this.committeesAuthoritiesEnabled) {
        if (!this.allCanViewCommittees) this.setMembersCanView(0);
      } else {
        this.authorities = this.authorities.filter(a => {
          if (a.committee_ids == undefined) return a;
        });
      }

      if (this.meetingsAuthoritiesEnabled) {
        if (!this.allCanViewMeetings) this.setMembersCanView(1);
      } else {
        this.authorities = this.authorities.filter(a => {
          if (a.meeting_ids == undefined) return a;
        });
      }

      if (this.actionsAuthoritiesEnabled) {
        if (!this.allCanViewActions) this.setMembersCanView(2);
      } else {
        this.authorities = this.authorities.filter(a => {
          if (a.action_ids == undefined) return a;
        });
      }
    },
    checkData() {
      this.$v.$touch();
      if (this.$v.$invalid) return false;
      this.formatAuthoritiesData();
      return this.authorities;
    }
  },
  validations: boardAuthoritiesValidation,
  computed: {
    resources() {
      return this.$store.getters.resources;
    },
    loading() {
      return this.$store.getters.loading;
    },
    boardUnderUpdate() {
      return this.$store.getters.boardUnderUpdate;
    }
  }
};
</script>