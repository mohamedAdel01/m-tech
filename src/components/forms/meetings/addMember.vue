<template>
  <b-form id="agenda-form" class="bg-white" @submit.prevent v-if="resources">
    <div class="d-flex flex-wrap border-bottom pb-3 mb-3">
      <b-form-group :label="$t('Title in arabic')" class="mb-2 col-md-6 col-12 px-2">
        <b-form-input type="text" v-model="$v.form.title_ar.$model"
        :state="!$v.form.title_ar.$error" />
        <b-form-invalid-feedback>{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group :label="$t('Title in english')" class="mb-2 col-md-6 col-12 px-2">
        <b-form-input type="text" v-model="$v.form.title_en.$model"
        :state="!$v.form.title_en.$error" />
        <b-form-invalid-feedback>{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group :label="$t('Name in arabic')" class="mb-2 col-md-6 col-12 px-2">
        <b-form-input type="text" v-model="$v.form.name_ar.$model"
        :state="!$v.form.name_ar.$error" />
        <b-form-invalid-feedback>{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group :label="$t('Name in english')" class="mb-2 col-md-6 col-12 px-2">
        <b-form-input type="text" v-model="$v.form.name_en.$model"
        :state="!$v.form.name_en.$error" />
        <b-form-invalid-feedback>{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group :label="$t('Email')" class="mb-2 col-md-6 col-12 px-2">
        <b-form-input type="email" v-model="$v.form.email.$model"
          :state="!$v.form.email.$error" />
        <b-form-invalid-feedback>{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group :label="$t('Phone number')" class="mb-2 col-md-6 col-12 px-2">
        <b-form-input type="tel" v-model="$v.form.mobile.$model"
          :state="!$v.form.mobile.$error" />
        <b-form-invalid-feedback>{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group :label="$t('Role')" class="mb-2 col-md-6 col-12 px-2">
        <v-select
          id="vselect"
          @input="$v.form.role_id.$model = $event.id"
          :options="resources.roles"
          label="name"
        />
        <b-form-invalid-feedback>{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group :label="$t('Nationality')" class="mb-2 col-md-6 col-12 px-2">
        <v-select
          id="vselect"
          @input="$v.form.nationality_id.$model = $event.id"
          :options="resources.nationalities"
          label="name"
        />
        <b-form-invalid-feedback>{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>


    </div>
  </b-form>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import mixins from '@/mixins'
import { personalInfoValidation } from "@/constants/validation.js";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin, mixins],
  components: {
    vSelect
  },
  data() {
    return {
      form:{
        title_en: null,
        title_ar: null,
        name_en: null,
        name_ar: null,
        email: null,
        mobile: null,
        nationality_id: null,
        role_id: null,
        activate_link:window.location.origin + "/login"
      }
    };
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
  validations: personalInfoValidation
};
</script>
$i18n.locale
<style lang="scss">
#agenda-form {
  .vs__actions {
    padding: 4px 8px 0 0 !important;
  }
}
</style>
