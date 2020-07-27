<template>
  <b-form id="meeting-info" class="bg-white rounded p-4" @submit.prevent v-if="resources">
    <div class="d-flex flex-wrap">
      <b-form-group :label="$t('Meeting Title')" class="mb-4 col-md-6 col-12 px-2">
        <b-form-input type="text" v-model="$v.form.title.$model" :state="!$v.form.title.$error" />
        <b-form-invalid-feedback>{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>

        <b-form-group :label="$t('Meeting Number')" class="mb-4 col-md-6 col-12 px-2">
          <b-form-input
            type="number"
            v-model="$v.form.number.$model"
            :state="!$v.form.number.$error"
          />
          <b-form-invalid-feedback>{{$t('This field is required')}}</b-form-invalid-feedback>
        </b-form-group>

        <div class="form-group col-md-6 col-12 px-2">
          <span class="d-inline-block label">{{ $t('Board / Committee') }}</span>
          <v-select
            label="name"
            v-model="$v.form.committee.$model"
            :state="!$v.form.committee.$error"
            :get-option-label="option => option.translation.name"
            :options="resources.boards"
            @input="getBoardMembers"
          />
          <div
            :class="{'invalid-feedback':true ,'d-block':$v.form.committee.$error && !$v.form.committee.required}"
          >{{$t('This field is required')}}</div>
        </div>

        <div class="form-group col-md-6 col-12 px-2">
          <span class="d-inline-block label">{{ $t('Meeting location') }}</span>
          <v-select
            label="name"
            v-model="$v.form.location.$model"
            :state="!$v.form.location.$error"
            :options="resources.locations.map(l => {
            let location = {};
            location.id = l.id;
            location.name = l.name ? l.name : null;
            return location;
          })"
          />
          <div
            :class="{'invalid-feedback':true ,'d-block':$v.form.location.$error && !$v.form.location.required}"
          >{{$t('This field is required')}}</div>
        </div>

        <b-form-group class="mb-4 col-12 px-2" :label="$t('Brief')">
          <b-textarea
            class="py-2 px-3"
            rows="3"
            v-model="$v.form.brief.$model"
            :state="!$v.form.brief.$error"
          ></b-textarea>
          <b-form-invalid-feedback>{{$t('This field is required')}}</b-form-invalid-feedback>
        </b-form-group>
      </div>

      <div class="mt-4">
        <h6 class="font-16">{{$t('The date and time the meeting started')}}</h6>
        <b-form-group>
          <div class="d-flex font-14 label mt-2">
            <b-form-radio
              class="mx-4"
              name="some-radios"
              v-model="suggestion"
              :value="false"
            >{{$t('Set a direct appointment')}}</b-form-radio>
            <b-form-radio
              v-model="suggestion"
              name="some-radios"
              :value="true"
            >{{$t('Send suggestions to members')}}</b-form-radio>
          </div>
        </b-form-group>
      </div>

      <div v-if="!suggestion" :class="suggestion ? 'd-none' : 'd-flex'">
        <b-form-group :label="$t('Meeting start')" class="mb-4 col-md-6 col-12 px-2">
          <div class="date position-relative">
            <span class="position-absolute ico"></span>
            <date-picker
              value-type="format"
              type="datetime"
              ref="date"
              v-model="$v.form.start_at.$model"
              format="YYYY/MM/DD hh:mm"
            ></date-picker>
          </div>

          <div
            :class="{'invalid-feedback':true ,'d-block':$v.form.start_at.$error && !$v.form.start_at.required}"
          >{{$t('This field is required')}}</div>
        </b-form-group>

        <b-form-group :label="$t('Meeting end')" class="mb-4 col-md-6 col-12 px-2">
          <div class="date position-relative">
            <span class="position-absolute ico"></span>
            <date-picker
              value-type="format"
              type="datetime"
              ref="date"
              v-model="$v.form.end_at.$model"
              format="YYYY/MM/DD hh:mm"
            ></date-picker>
          </div>

          <div
            :class="{'invalid-feedback':true ,'d-block':$v.form.end_at.$error && !$v.form.end_at.required}"
          >{{$t('This field is required')}}</div>
        </b-form-group>
      </div>

      <div v-show="suggestion">
        <suggestions-form ref="suggestionsForm" />
      </div>
    </template>
    <div class="d-flex align-items-center justify-content-center my-3" v-if="loading">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
    </div>
  </b-form>
</template>

<script>
import suggestionsForm from "./suggestions";
import mixins from "@/mixins";
import { meetingInfoValidation } from "@/constants/validation.js";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  mixins: [validationMixin, mixins],
  components: {
    suggestionsForm,
    vSelect,
    DatePicker
  },
  data() {
    return {
      form: {
        title: null,
        number: null,
        publish: null,
        brief: null,
        quorum: 0,
        committee: null,
        location: null,
        start_at: null,
        end_at: null
      },
      boardsAndCommitteesRawData: [],
      options: [],
      date: null,
      suggestion: false,
      test: 1
    };
  },
  watch: {
    suggestion: {
      immediate: true,
      handler(val) {
        this.$emit("suggestion", val);
      }
    }
  },
  computed: {
    resources() {
      return this.$store.getters.resources;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    getBoardMembers() {
      let payload =
        this.form.committee.type == "Committees"
          ? { key: "board_id", value: this.form.committee.id }
          : { key: "committee_id", value: this.form.committee.id };
      this.$store.dispatch("COMMON", {
        service: "MEMBERS",
        reqPayload: payload
      });
    },
    checkData() {
      this.$v.$touch();
      let suggestionForm = this.suggestion
        ? this.$refs.suggestionsForm.checkData()
        : true;
      if (this.$v.$invalid || !suggestionForm) {
        window.scroll({
          top: 190,
          left: 0,
          behavior: "smooth"
        });
        return false;
      }
      if (this.suggestion) {
        return {
          title: this.form.title,
          brief: this.form.brief,
          committee_id: this.form.committee.id,
          location_id: this.form.location.id,
          ...suggestionForm
        };
      }
      return this.form;
    }
  },
  async created() {
    await this.$store.dispatch("TENENTDATA", {
      service: "SHOW_BOARDS",
      reqPayload: null
    });
  },
  validations() {
    if (this.suggestion) {
      return {
        form: {
          ...meetingInfoValidation
        }
      };
    } else {
      return {
        form: {
          ...meetingInfoValidation,
          start_at: {
            required
          },
          end_at: {
            required
          }
        }
      };
    }
  }
};
</script>

<style lang="scss">
#meeting-info {
  .date {
    .ico {
      bottom: 0;
      background: #eee;
      height: 100%;
      width: 2.5rem;
      border: 1px solid #ced4da;
      border-radius: 0.25rem 0 0 0.25rem;
    }
  }
}
</style>
