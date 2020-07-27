<template>
  <b-form @submit.prevent v-if="resources">
    <h6>{{$t('Public info')}}</h6>
    <div class="d-flex flex-wrap border-bottom pb-3 mb-3">
      <div class="form-group has-float-label col-md-6 px-2">
        <span class="font-13 d-inline-block">{{ $t('Title in arabic') }}</span>
        <b-form-input
          type="text"
          v-model="$v.form.title_ar.$model"
          :state="!$v.form.title_ar.$error"
        />

        <div
          :class="{'invalid-feedback':true ,'d-block':$v.form.title_ar.$error && !$v.form.title_ar.required}"
        >{{$t('This field is required')}}</div>
      </div>

      <div class="form-group has-float-label col-md-6 px-2">
        <span class="font-13 d-inline-block">{{ $t('Title in english') }}</span>
        <b-form-input
          type="text"
          v-model="$v.form.title_en.$model"
          :state="!$v.form.title_en.$error"
        />

        <div
          :class="{'invalid-feedback':true ,'d-block':$v.form.title_en.$error && !$v.form.title_en.required}"
        >{{$t('This field is required')}}</div>
      </div>

      <b-form-group :label="$t('Name in arabic')" class="has-float-label col-md-6 px-2 mb-4">
        <b-form-input
          type="text"
          v-model="$v.form.name_ar.$model"
          :state="!$v.form.name_ar.$error"
        />
        <b-form-invalid-feedback v-if="!$v.form.name_ar.required">{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group :label="$t('Name in english')" class="has-float-label col-md-6 px-2 mb-4">
        <b-form-input
          type="text"
          v-model="$v.form.name_en.$model"
          :state="!$v.form.name_en.$error"
        />
        <b-form-invalid-feedback v-if="!$v.form.name_en.required">{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>

      <div class="form-group col-md-6 col-12 px-2">
        <span class="pb-2 d-inline-block font-13 pb-0">{{ $t('Birth Date') }}</span>
        <div class="date position-relative">
          <span class="position-absolute ico"></span>
          <datetime ref="date" v-model="$v.form.birthDate.$model"></datetime>
        </div>
        <div
          :class="{'invalid-feedback':true ,'d-block':$v.form.birthDate.$error && !$v.form.birthDate.required}"
        >{{$t('This field is required')}}</div>
      </div>

      <div class="form-group has-float-label col-md-6 px-2">
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

      <div class="form-group col-12 px-2">
        <span class="pb-2 d-inline-block font-13 pb-0">{{ $t('Roles') }}</span>
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
    </div>
    <h6>{{$t('Comunication info')}}</h6>
    <div class="d-flex flex-wrap pb-3 mb-3">
      <b-form-group :label="$t('Email')" class="col-md-6 col-12 px-2 mb-4">
        <b-form-input type="text" v-model="$v.form.email.$model" :state="!$v.form.email.$error" />
        <b-form-invalid-feedback>{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>

      <div class="form-group col-md-6 col-12 px-2">
        <span class="pb-2 d-inline-block font-13 pb-0">{{ $t('Phone number') }}</span>
        <vue-tel-input
          placeholder="05xxxxxxxxxxx"
          defaultCountry="sa"
          v-model="$v.form.mobile.$model"
          :state="!$v.form.mobile.$error"
        ></vue-tel-input>
        <div
          :class="{'invalid-feedback':true ,'d-block':$v.form.mobile.$error && !$v.form.mobile.required}"
        >{{$t('This field is required')}}</div>
      </div>
    </div>
  </b-form>
</template>

<script>
import { Datetime } from "vue-datetime";
import vSelect from "vue-select";
import { VueTelInput } from "vue-tel-input";
import "vue-select/dist/vue-select.css";
import "vue-datetime/dist/vue-datetime.css";
import { addUserValidation } from "@/constants/validation.js";
import { validationMixin } from "vuelidate";
export default {
  mixins: [validationMixin],
  props: ["user"],
  components: {
    Datetime,
    vSelect,
    VueTelInput
  },
  data() {
    return {
      form: {
        email: null,
        mobile: null,
        title_en: null,
        title_ar: null,
        name_en: null,
        name_ar: null,
        password: "123456",
        nationality_id: null,
        role_id: null,
        birthDate: null,
        slug: null,
        activate_link: null
      }
    };
  },
  watch: {
    user: {
      immediate: true,
      handler(val) {
        if(!val) return
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
    },
  },
  computed: {
    resources() {
      return this.$store.getters.resources;
    }
  },
  methods: {
    checkData() {
      this.$v.$touch();
      if (this.$v.$invalid) return false;
      return this.form;
    }
  },
  created() {
    this.form.activate_link = window.location.origin + "/active-account";
    this.form.slug = this.$store.getters.slug;
  },
  validations: addUserValidation
};
</script>