<template>
  <b-form class="info-form bg-white rounded p-3" @submit.prevent>
    <div class="d-flex flex-wrap">
      <b-form-group :label="$t('Arabic name')" class="mb-4 col-md-6 col-12 px-2">
        <b-form-input
          v-model="$v.form.name_ar.$model"
          :state="!$v.form.name_ar.$error"
          type="text"
        />
        <b-form-invalid-feedback>{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group :label="$t('English name')" class="mb-4 col-md-6 col-12 px-2">
        <b-form-input
          v-model="$v.form.name_en.$model"
          :state="!$v.form.name_en.$error"
          type="text"
        />
        <b-form-invalid-feedback>{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group :label="$t('Board charter')" class="mb-4 col-12 px-2">
        <input type="file" class="d-none" ref="charter" @change="uploadFile($event)" />
        <div class="text-center form-control pointer mb-2" @click="$refs.charter.click()">
          <arrow-in-icon style="transform: rotate(180deg)" />
          <span class="mx-2 text-black-50">{{$t('Choose file')}}</span>
        </div>
        <div
          v-if="file"
          class="d-flex justify-content-between align-items-center bg-light form-control border-0"
        >
          <p class="mb-0">{{file.name}}</p>
          <div class="pointer" @click="file = null">
            <img src="@/assets/images/icons/bin.svg" />
          </div>
        </div>
      </b-form-group>
      <div class="col-12 mb-4">
        <h6>{{$t('Board duration')}}</h6>
        <div class="d-flex">
          <b-form-radio
            v-model="form.is_permanent"
            name="some-radios"
            :value="1"
          >{{$t('Permanent')}}</b-form-radio>
          <b-form-radio
            v-model="form.is_permanent"
            name="some-radios"
            :value="0"
            class="mx-4"
          >{{$t('Temporary')}}</b-form-radio>
        </div>
      </div>

      <div v-if="!form.is_permanent" class="w-100 d-flex">
        <b-form-group :label="$t('Board start date')" class="mb-4 col-md-6 col-12 px-2">
          <div class="date position-relative">
            <span class="position-absolute ico"></span>
            <date-picker
              type="date"
              ref="date"
              v-model="$v.form.start_at.$model"
              format="DD/MM/YYYY"
            ></date-picker>
          </div>

          <div
            :class="{'invalid-feedback':true ,'d-block':$v.form.start_at.$error && !$v.form.start_at.required}"
          >{{$t('This field is required')}}</div>
        </b-form-group>

        <b-form-group :label="$t('Board end date')" class="mb-4 col-md-6 col-12 px-2">
          <div class="date position-relative">
            <span class="position-absolute ico"></span>
            <date-picker type="date" ref="date" v-model="$v.form.end_at.$model" format="DD/MM/YYYY"></date-picker>
          </div>

          <div
            :class="{'invalid-feedback':true ,'d-block':$v.form.end_at.$error && !$v.form.end_at.required}"
          >{{$t('This field is required')}}</div>
        </b-form-group>
      </div>
    </div>
  </b-form>
</template>

<script>
import moment from "moment";
import mixins from "@/mixins";
import arrowInIcon from "@/components/SVG/arrow-in.vue";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { boardInfoValidation } from "@/constants/validation.js";

import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
export default {
  mixins: [validationMixin, mixins],
  components: {
    vSelect,
    DatePicker,
    arrowInIcon
  },
  data() {
    return {
      form: {
        is_permanent: 1,
        name_ar: "",
        name_en: "",
        start_at: "",
        end_at: "",
        commercial_register: null
      },
      file: null
    };
  },
  computed: {
    boardUnderUpdate() {
      return this.$store.getters.boardUnderUpdate;
    }
  },
  watch: {
    boardUnderUpdate: {
      immediate: true,
      handler(val) {
        if (!val) return;
        Object.assign(this.form, val);
        this.form.start_at = new Date(this.form.start_at);
        this.form.end_at = new Date(this.form.end_at);
      }
    }
  },
  methods: {
    uploadFile(e) {
      if (!e.target.files) return;
      const data = new FormData();
      data.append("file", e.target.files[0]);
      this.handleRequest("FILES", "UPLOAD_FILE", data).then(res => {
        this.commercial_register = res.id;
        this.file = {
          id: res.id,
          name: res.name
        };
      });
    },
    checkData() {
      this.$v.$touch();
      if (this.$v.$invalid) return false;
      this.form.start_at = moment(this.form.start_at).format("YYYY/MM/DD");
      this.form.end_at = moment(this.form.end_at).format("YYYY/MM/DD");
      if (!this.form.is_permanent) return this.form;
      delete this.form.start_at;
      delete this.form.end_at;
      return this.form;
    }
  },
  validations() {
    if (this.form.is_permanent) {
      return {
        form: {
          ...boardInfoValidation
        }
      };
    } else {
      return {
        form: {
          ...boardInfoValidation,
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
.info-form {
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