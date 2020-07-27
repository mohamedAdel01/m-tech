<template>
  <div>
    <div class="bg-light rounded px-3 pb-3 pt-5 mb-3">
      <div class="d-flex align-items-center justify-content-center">
        <b-spinner v-if="loading" variant="primary" label="Spinning"></b-spinner>
      </div>
      <personal-info-form v-if="!loading" ref="personalInfoForm" />
    </div>
    <div class="text-right">
      <button class="btn btn-outline-danger rounded-pill px-3 mx-3">{{$t('Cancel')}}</button>
      <button class="btn btn-primary rounded-pill px-4" @click="save">{{$t('Save')}}</button>
    </div>
  </div>
</template>

<script>
import mixins from "@/mixins";
import personalInfoForm from "@/components/forms/my-account/personalInfo.vue";
export default {
  mixins: [mixins],
  components: {
    personalInfoForm
  },
  methods: {
    save() {
      let form = this.$refs.personalInfoForm.checkData();
      if (!form)
        return this.$toasted.error(this.$t("Please provide a valid data"));
      this.handleRequest("USERS", "EDIT_USER", form).then(res => {
        this.$toasted.show(res);
      });
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  },
  created() {
    this.handleRequest("COMMON", "RESOURCES", "languages,nationalities,roles");
  }
};
</script>
