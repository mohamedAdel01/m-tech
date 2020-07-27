<template>
  <div>
    <h6>{{$t('Change password')}}</h6>
    <div class="bg-light rounded p-3 mb-3">
      <password-form />
    </div>
    <div class="text-right">
      <button class="btn btn-outline-danger rounded-pill px-3 mx-3">{{$t('Cancel')}}</button>
      <button class="btn btn-primary rounded-pill px-4">{{$t('Save')}}</button>
    </div>
  </div>
</template>

<script>
import passwordForm from "@/components/forms/my-account/password.vue";

export default {
  components: {
    passwordForm
  }
};
</script>

<style>
</style>