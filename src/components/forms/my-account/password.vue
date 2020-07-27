<template>
  <b-form @submit.prevent class="position-relative d-flex flex-wrap bg-white rounded p-3">
    <b-form-group :label="$t('Current Password')" class="col-12 mb-4">
      <b-form-input
        type="password"
        v-model="$v.form.password.$model"
        :state="!$v.form.password.$error"
      />
      <div class="text-right">
        <button class="btn btn-link text-primary">{{$t('Forget password')}}</button>
      </div>
      <b-form-invalid-feedback
        v-if="!$v.form.password.required"
      >{{$t('This field is required')}}</b-form-invalid-feedback>
      <b-form-invalid-feedback
        v-else-if="!$v.form.password.minLength || !$v.form.password.maxLength"
      >{{ $t('Your password must be between 4 and 16 characters')}}</b-form-invalid-feedback>
    </b-form-group>

    <b-form-group :label="$t('New Password')" class="col-md-6 col-12 mb-4">
      <b-form-input
        type="password"
        v-model="$v.form.newPassword.$model"
        :state="!$v.form.newPassword.$error"
      />
      <b-form-invalid-feedback
        v-if="!$v.form.newPassword.required"
      >{{$t('This field is required')}}</b-form-invalid-feedback>
      <b-form-invalid-feedback
        v-else-if="!$v.form.newPassword.minLength || !$v.form.newPassword.maxLength"
      >{{ $t('Your password must be between 4 and 16 characters')}}</b-form-invalid-feedback>
    </b-form-group>

    <b-form-group :label="$t('Confirm New Password')" class="col-md-6 col-12 mb-4">
      <b-form-input
        type="password"
        v-model="$v.form.confirmPassword.$model"
        :state="!$v.form.confirmPassword.$error"
      />
      <b-form-invalid-feedback
        v-if="!$v.form.confirmPassword.required"
      >{{$t('This field is required')}}</b-form-invalid-feedback>
      <b-form-invalid-feedback
        v-else-if="!$v.form.confirmPassword.minLength || !$v.form.confirmPassword.maxLength"
      >{{ $t('Your password must be between 4 and 16 characters')}}</b-form-invalid-feedback>
    </b-form-group>
  </b-form>
</template>


<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, minLength } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        password: null,
        newPassword: null,
        confirmPassword: null
      }
    };
  },
  validations: {
    form: {
      password: {
        required,
        maxLength: maxLength(16),
        minLength: minLength(4)
      },
      newPassword: {
        required,
        maxLength: maxLength(16),
        minLength: minLength(4)
      },
      confirmPassword: {
        required,
        maxLength: maxLength(16),
        minLength: minLength(4)
      }
    }
  },
  methods: {
    checkData() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.$emit("login", this.form);
    }
  }
};
</script>