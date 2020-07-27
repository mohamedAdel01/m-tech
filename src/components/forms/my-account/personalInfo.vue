<template>
  <b-form @submit.prevent class="position-relative bg-white rounded px-3 pb-3 pt-5 mt-5">
    <div
      class="position-absolute personal-img form-group d-flex align-items-center justify-content-center col-12 mb-4"
    >
      <div class="position-relative">
        <img
          @click="$refs.personalImg.click()"
          class="rounded-circle pointer"
          :src="this.form.image ? this.form.image : require('@/assets/images/default-avatar.jpg')"
          alt
        />
        <input class="d-none" type="file" ref="personalImg" @change="handleImage($event)" />
        <span
          class="position-absolute close bg-danger rounded px-2 pointer py-1 text-white"
          @click="form.image = null"
        >x</span>
      </div>
    </div>
    <div class="pt-5 d-flex flex-wrap">
      <b-form-group :label="$t('Title in english')" class="col-md-6 col-12 px-2 mb-4">
        <b-form-input
          type="text"
          v-model="$v.form.title_en.$model"
          :state="!$v.form.title_en.$error"
        />
        <b-form-invalid-feedback
          v-if="!$v.form.title_en.required"
        >{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group :label="$t('Title in arabic')" class="col-md-6 col-12 px-2 mb-4">
        <b-form-input
          type="text"
          v-model="$v.form.title_ar.$model"
          :state="!$v.form.title_ar.$error"
        />
        <b-form-invalid-feedback
          v-if="!$v.form.title_ar.required"
        >{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group :label="$t('Name in english')" class="col-md-6 col-12 px-2 mb-4">
        <b-form-input
          type="text"
          v-model="$v.form.name_en.$model"
          :state="!$v.form.name_en.$error"
        />
        <b-form-invalid-feedback
          v-if="!$v.form.name_en.required"
        >{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group :label="$t('Name in arabic')" class="col-md-6 col-12 px-2 mb-4">
        <b-form-input
          type="text"
          v-model="$v.form.name_ar.$model"
          :state="!$v.form.name_ar.$error"
        />
        <b-form-invalid-feedback
          v-if="!$v.form.name_ar.required"
        >{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group :label="$t('Email')" class="col-md-6 col-12 px-2 mb-4">
        <b-form-input type="text" v-model="$v.form.email.$model" :state="!$v.form.email.$error" />
        <b-form-invalid-feedback
          v-if="!$v.form.email.required"
        >{{$t('This field is required')}}</b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.email.email">Please enter a valid email address</b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.email.minLength"
        >Your email must be minimum 4 characters</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group :label="$t('Phone number')" class="col-md-6 col-12 px-2 mb-4">
        <vue-tel-input
          placeholder="05xxxxxxxxxxx"
          defaultCountry="sa"
          v-model="$v.form.mobile.$model"
          :state="!$v.form.mobile.$error"
        ></vue-tel-input>
        <b-form-invalid-feedback
          v-if="!$v.form.email.required"
        >{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>
      <div class="form-group has-float-label col-md-6 col-12 px-2">
        <span class="font-13 d-inline-block">{{ $t('Nationality') }}</span>
        <v-select
          id="vselect"
          :value="resources.nationalities.filter(nationality => nationality.id == form.nationality_id)"
          @input="$v.form.nationality_id.$model = $event.id"
          :options="resources.nationalities"
          label="name"
        />
        <div
          :class="{'invalid-feedback':true ,'d-block':$v.form.nationality_id.$error && !$v.form.nationality_id.required}"
        >{{$t('This field is required')}}</div>
      </div>

      <div class="form-group col-md-6 col-12 px-2">
        <span class="pb-2 d-inline-block font-13 pb-0">{{ $t('Role') }}</span>
        <v-select
          id="vselect"
          :value="resources.roles.filter(role => role.id == form.role_id)"
          @input="$v.form.role_id.$model = $event.id"
          :options="resources.roles"
          label="name"
        />
        <div
          :class="{'invalid-feedback':true ,'d-block':$v.form.role_id.$error && !$v.form.role_id.required}"
        >{{$t('This field is required')}}</div>
      </div>

      <div class="form-group col-md-6 col-12 px-2">
        <span class="pb-2 d-inline-block font-13 pb-0">{{ $t('Prefered Language') }}</span>
        <v-select
          id="vselect"
          @input="$v.form.preferedLang.$model = $event.id"
          :options="[]"
          label="name"
        />
        <div
          :class="{'invalid-feedback':true ,'d-block':$v.form.preferedLang.$error && !$v.form.preferedLang.required}"
        >{{$t('This field is required')}}</div>
      </div>

      <b-form-group :label="$t('Birth Date')" class="mb-4 col-md-6 col-12 px-2">
        <div class="date position-relative">
          <span class="position-absolute ico"></span>
          <datetime ref="date" v-model="$v.form.birthDate.$model"></datetime>
        </div>

        <b-form-invalid-feedback>{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>
    </div>
  </b-form>
</template>

<script>
import vSelect from "vue-select";
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
import "vue-select/dist/vue-select.css";
import { personalInfoValidation } from "@/constants/validation.js";
import { VueTelInput } from "vue-tel-input";
import { validationMixin } from "vuelidate";

import {
  required,
  maxLength,
  minLength,
  email,
  sameAs
} from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  components: { VueTelInput, vSelect, Datetime },
  data() {
    return {
      form: {
        image: null,
        title_en: null,
        title_ar: null,
        name_en: null,
        name_ar: null,
        email: null,
        mobile: null,
        preferedLang: null,
        birthDate: null,
        nationality_id: null,
        role_id: null
      }
    };
  },
  watch: {
    user: {
      immediate: true,
      handler(val) {
        this.form = Object.assign(
          {
            id: val.id
          },
          this.form,
          ...Object.keys(this.form).map(
            key => key in val && { [key]: val[key] }
          )
        );
      }
    }
  },
  computed: {
    resources() {
      return this.$store.getters.resources;
    },
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    handleImage(e) {
      this.form.image = URL.createObjectURL(e.target.files[0]);
    },
    checkData() {
      this.$v.$touch();
      if (this.$v.$invalid) return false;
      return this.form;
    }
  },
  validations: personalInfoValidation
};
</script>

<style scoped>
.personal-img {
  top: -19%;
}
img {
  height: 150px;
  width: 150px;
  border: 10px solid var(--light-color);
}

.close {
  top: 0;
  right: 0;
}

.date .ico {
  bottom: 0;
  background: #eee;
  height: 100%;
  width: 2.5rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem 0 0 0.25rem;
}
</style>