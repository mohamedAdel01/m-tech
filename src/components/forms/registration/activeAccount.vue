<template>
  <b-form @submit.prevent class="av-tooltip tooltip-label-bottom">
    <b-form-group :label="$t('Code')" class="mb-4 w-100 px-2">
      <b-form-input type="text" v-model="$v.form.code.$model" :state="!$v.form.code.$error" />

      <b-form-invalid-feedback v-if="!$v.form.code.required">{{$t('This field is required')}}</b-form-invalid-feedback>
    </b-form-group>
  </b-form>
</template>

<script>
import { activeAccountValidation } from "@/constants/validation.js";
import { validationMixin } from "vuelidate";
export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        code: null
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
  validations: activeAccountValidation
};
</script>