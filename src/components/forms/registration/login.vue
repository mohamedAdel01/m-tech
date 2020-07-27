<template>
  <b-form @submit.prevent>
    <div class="d-flex flex-wrap">
      <b-form-group :label="$t('Email or Mobile number')" class="mb-4 w-100 px-2">
        <b-form-input
          type="text"
          v-model="$v.form['email-mobile'].$model"
          :state="!$v.form['email-mobile'].$error"
        />
        <b-form-invalid-feedback>{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group :label="$t('Password')" class="w-100 px-2">
        <b-form-input
          type="password"
          v-model="$v.form.password.$model"
          :state="!$v.form.password.$error"
        />
        <b-form-invalid-feedback v-if="!$v.form.password.required">{{$t('This field is required')}}</b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.password.minLength || !$v.form.password.maxLength"
        >{{ $t('Your password must be between 4 and 16 characters')}}</b-form-invalid-feedback>
      </b-form-group>
    </div>
  </b-form>
</template>

<script>
import mixins from "@/mixins";
import { loginValidation } from "@/constants/validation.js";
import { validationMixin } from "vuelidate";
export default {
  mixins: [validationMixin, mixins],
  data() {
    return {
      form: {
        "email-mobile": null,
        password: null,
        slug: null,
        fcm: (localStorage.getItem('fcm'))?localStorage.getItem('fcm'):"fcm"
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
  computed: {
    slug() {
      return this.$store.getters.slug;
    }
  },
  created() {
    if (this.slug) return (this.form.slug = this.slug);
    let query = this.$route.query;
    if (Object.keys(query).length === 0 && query.constructor === Object) {
      this.$toasted.show(this.$t("Please choose your company first"));
      this.$router.push("/company-name");
      return;
    }
    this.loading = true;
    this.form.slug = query.slug;
    this.email.slug = query.email;
    this.$toasted.show(this.$t("Please wait... your account is activating"));
    this.handleRequest("REGISTRATION", "ACTIVATE_ACCOUNT", query).then(res => {
      this.$toasted.success(this.$t(res));
      this.loading = false;
      window.location.href = window.location.origin + window.location.pathname;
    });
  },
  validations: loginValidation
};
</script>