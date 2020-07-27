<template>
  <b-form @submit.prevent class="av-tooltip tooltip-label-bottom">
    <div class="d-flex align-items-center" style="direction: ltr">
      <b-form-group :label="$t('Company name')" class="mb-4 w-100 px-2">
        <b-form-input type="text" :placeholder="$t('Company name')" v-model="$v.form.slug.$model" :state="!$v.form.slug.$error" />
       
        <b-form-invalid-feedback v-if="!$v.form.slug.required">{{$t('This field is required')}}</b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.slug.minLength || !$v.form.slug.maxLength"
        >{{ $t('Your slug must be more than 4 characters')}}</b-form-invalid-feedback>
      </b-form-group>
      <span class="pl-2">.majles.tech</span>
    </div>
  </b-form>
</template>

<script>
import { companyNameValidation } from "@/constants/validation.js";
import { validationMixin } from "vuelidate";
export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        slug: null
      }
    };
  },
  methods: {
    checkData() {
      this.$v.$touch();
      if (this.$v.$invalid) return false;
      return this.form;
    }
  },
  validations: companyNameValidation
};
</script>