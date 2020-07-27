<template>
  <b-form @submit.prevent="checkData" class="d-flex flex-wrap av-tooltip tooltip-label-bottom">
    <b-form-group :label="$t('Company Name in arabic')" class="has-float-label col-md-6 px-2 mb-4">
      <b-form-input
        type="text"
        v-model="$v.form.account_ar.$model"
        :state="!$v.form.account_ar.$error"
      />
      <b-form-invalid-feedback v-if="!$v.form.account_ar.required">{{$t('This field is required')}}</b-form-invalid-feedback>
    </b-form-group>

    <b-form-group :label="$t('Company Name in english')" class="has-float-label col-md-6 px-2 mb-4">
      <b-form-input
        type="text"
        v-model="$v.form.account_en.$model"
        :state="!$v.form.account_en.$error"
      />
      <b-form-invalid-feedback v-if="!$v.form.account_en.required">{{$t('This field is required')}}</b-form-invalid-feedback>
    </b-form-group>

    <div class="w-100 d-flex align-items-center" style="direction: ltr">
      <b-form-group :label="$t('Company name')" class="mb-4 w-100 px-2">
        <b-form-input
          type="text"
          :placeholder="$t('Company name')"
          v-model="$v.form.slug.$model"
          :state="!$v.form.slug.$error"
        />

        <b-form-invalid-feedback v-if="!$v.form.slug.required">{{$t('This field is required')}}</b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.slug.minLength || !$v.form.slug.maxLength"
        >{{ $t('Your slug must be more than 4 characters')}}</b-form-invalid-feedback>
      </b-form-group>
      <span class="pl-2">.majles.tech</span>
    </div>

    <div class="form-group col-12 px-2">
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
      <b-form-input type="text" v-model="$v.form.name_ar.$model" :state="!$v.form.name_ar.$error" />
      <b-form-invalid-feedback v-if="!$v.form.name_ar.required">{{$t('This field is required')}}</b-form-invalid-feedback>
    </b-form-group>

    <b-form-group :label="$t('Name in english')" class="has-float-label col-md-6 px-2 mb-4">
      <b-form-input type="text" v-model="$v.form.name_en.$model" :state="!$v.form.name_en.$error" />
      <b-form-invalid-feedback v-if="!$v.form.name_en.required">{{$t('This field is required')}}</b-form-invalid-feedback>
    </b-form-group>

    <b-form-group :label="$t('Email')" class="has-float-label col-md-6 px-2 mb-4">
      <b-form-input type="text" v-model="$v.form.email.$model" :state="!$v.form.email.$error" />
      <b-form-invalid-feedback v-if="!$v.form.email.required">{{$t('This field is required')}}</b-form-invalid-feedback>
      <b-form-invalid-feedback v-else-if="!$v.form.email.email">{{ $t('Please enter a valid email address')}}</b-form-invalid-feedback>
      <b-form-invalid-feedback
        v-else-if="!$v.form.email.minLength"
      >{{$t('Your email must be minimum 6 characters')}}</b-form-invalid-feedback>
    </b-form-group>

    <b-form-group :label="$t('Password')" class="has-float-label col-md-6 px-2 mb-4">
      <b-form-input
        type="password"
        v-model="$v.form.password.$model"
        :state="!$v.form.password.$error"
      />
      <b-form-invalid-feedback v-if="!$v.form.password.required">Please enter your password</b-form-invalid-feedback>
      <b-form-invalid-feedback
        v-else-if="!$v.form.password.minLength || !$v.form.password.maxLength"
      >{{$t('Your password must be between 4 and 16 characters')}}</b-form-invalid-feedback>
    </b-form-group>

    <b-form-group :label="$t('Confirm password')" class="has-float-label col-md-6 px-2 mb-4">
      <b-form-input
        type="password"
        v-model="$v.form.password_confirmation.$model"
        :state="!$v.form.password_confirmation.$error"
      />
      <b-form-invalid-feedback
        v-if="!$v.form.password_confirmation.required"
      >{{$t('Please enter your password confirmation')}}</b-form-invalid-feedback>
      <b-form-invalid-feedback
        v-else-if="!$v.form.password_confirmation.minLength || !$v.form.password_confirmation.maxLength"
      >{{$t('Your password confirmation must be between 4 and 16 characters')}}</b-form-invalid-feedback>
      <b-form-invalid-feedback
        v-else-if="!$v.form.password_confirmation.sameAsPassword"
      >{{$t('Passwords must match')}}</b-form-invalid-feedback>
    </b-form-group>

    <div class="form-group has-float-label col-md-6 px-2" v-if="resources">
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
  </b-form>
</template>

<script>
import mixins from "@/mixins";
import { registerValidation } from "@/constants/validation.js";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { VueTelInput } from "vue-tel-input";
import { validationMixin } from "vuelidate";
export default {
  mixins: [validationMixin, mixins],
  components: { VueTelInput, vSelect },
  data() {
    return {
      form: {
        account_ar: "",
        account_en: "",
        slug: "",
        title_en: "",
        title_ar: "",
        name_ar: "",
        name_en: "",
        mobile: "",
        email: "",
        password: "",
        role_id: 1,
        password_confirmation: "",
        nationality_id: "",
        activate_link: ""
      }
    };
  },
  computed: {
    resources() {
      return this.$store.getters.resources;
    }
  },
  watch: {
    "form.account_en"(newVal, oldVal) {
      if (
        (this.form.slug && oldVal == this.form.slug.replace(/-+/g, " ")) ||
        !this.form.slug
      ) {
        this.form.slug = newVal.replace(/ +/g, "-");
      }
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
    this.handleRequest("COMMON", "RESOURCES", "nationalities");
    this.form.activate_link = window.location.origin + "/login";
  },
  validations: registerValidation
};
</script>