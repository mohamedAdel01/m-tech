<template>
  <b-form @submit.prevent>
    <div class="d-flex flex-wrap">
      <b-form-group :label="$t('Email')" class="mb-4 w-100 px-2">
        <b-form-input type="email" v-model="$v.form.email.$model" :state="!$v.form.email.$error" />
        <b-form-invalid-feedback>{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>
    </div>
  </b-form>
</template>

<script>
import { forgetPasswordValidation } from "@/constants/validation.js";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        email: null
      }
    };
  },
  validations: forgetPasswordValidation
};
</script>
