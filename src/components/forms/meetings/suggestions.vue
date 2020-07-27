<template>
  <b-form id="meeting-info" class="bg-white rounded p-3" @submit.prevent>
    <div>
      <div class="d-flex">
        <p class="w-50 mb-1 label">{{$t('Meeting start')}}</p>
        <p class="w-50 mb-1 label">{{$t('Meeting end')}}</p>
      </div>

      <div v-for="(time, i) in $v.times.$each.$iter" :key="i" class="d-flex align-items-center">
        <b-form-group class="w-50 px-2">
          <div class="date position-relative">
            <span class="position-absolute ico"></span>
            <date-picker
              value-type="format"
              type="datetime"
              ref="date"
              v-model="time.start_at.$model"
              format="YYYY/MM/DD hh:mm"
            ></date-picker>
            <div
              :class="{'invalid-feedback':true ,'d-block':time.start_at.$error && !time.start_at.required}"
            >{{$t('This field is required')}}</div>
          </div>

          <b-form-invalid-feedback>{{$t('This field is required')}}</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group class="w-50 px-2">
          <div class="date position-relative">
            <span class="position-absolute ico"></span>
            <date-picker
              value-type="format"
              type="datetime"
              ref="date"
              v-model="time.end_at.$model"
              format="YYYY/MM/DD hh:mm"
            ></date-picker>
            <div
              :class="{'invalid-feedback':true ,'d-block':time.end_at.$error && !time.end_at.required}"
            >{{$t('This field is required')}}</div>
          </div>
        </b-form-group>

        <div
          :class="['mb-3 pointer', {'invisible': times.length < 2}]"
          @click="times.length > 1 ? times.splice(i, 1) : null;"
        >
          <c-close-icon style="width: 18px" />
        </div>
      </div>

      <button class="btn btn-link d-flex pointer" @click="addNewTime">
        <c-add-icon />
        <p class="mx-2">{{$t("Add another suggestion")}}</p>
      </button>

      <div class="mt-4">
        <b-form-group
          :label="$t('The voting end date for the meeting')"
          class="mb-4 col-md-6 col-12 px-2 pr-3"
        >
          <div class="date position-relative">
            <span class="position-absolute ico"></span>
            <date-picker
              value-type="format"
              type="datetime"
              ref="date"
              v-model="$v.time_voting_end_at.$model"
              format="YYYY/MM/DD hh:mm"
            ></date-picker>
          </div>

          <div
            :class="{'invalid-feedback':true ,'d-block':$v.time_voting_end_at.$error && !$v.time_voting_end_at.required}"
          >{{$t('This field is required')}}</div>
        </b-form-group>
      </div>
    </div>
  </b-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import cAddIcon from "@/components/SVG/c-add.vue";
import cCloseIcon from "@/components/SVG/c-close.vue";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  mixins: [validationMixin],
  components: {
    DatePicker,
    cAddIcon,
    cCloseIcon
  },
  data() {
    return {
      times: [
        {
          start_at: null,
          end_at: null
        }
      ],
      time_voting_end_at: null
    };
  },
  methods: {
    checkData() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      }
      return this.$data;
    },
    addNewTime() {
      this.times.push({
        start_at: null,
        end_at: null
      });
    }
  },
  validations: {
    times: {
      required,
      $each: {
        start_at: {
          required
        },
        end_at: {
          required
        }
      }
    },
    time_voting_end_at: {
      required
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
