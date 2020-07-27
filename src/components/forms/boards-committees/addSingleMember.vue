<template>
  <b-form class="bg-white p-3 rounded" @submit.prevent>
    <div class="d-flex align-items-center justify-content-center my-3" v-if="loading">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
    </div>
    <div class="d-flex align-items-center flex-wrap" v-if="!loading">
      <div class="form-group col-md-6 col-12 px-2">
        <span class="d-inline-block font-13">{{ $t('Member name') }}</span>
        <v-select
          id="vselect"
          :value="null"
          @input="$emit('selectMember', $event.id)"
          :get-option-label="option => option.translation.name"
          :options="resources.users.filter(user => ![selected, otherOne].includes(user.id))"
        />
      </div>

      <div class="d-flex align-items-center bg-light rounded-pill py-2 px-3 mt-1" v-if="selected">
        <p class="mb-0">
          <span>{{(resources.users.filter(user => user.id == selected))[0].translation.title}}</span>
          <span
            class="px-3"
          >{{(resources.users.filter(user => user.id == selected))[0].translation.name}}</span>
        </p>
        <div @click="$emit('deleteSelected')">
          <img class="pointer" style="width:17px" src="@/assets/images/icons/bin.svg" />
        </div>
      </div>
    </div>
  </b-form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
export default {
  mixins: [validationMixin],
  props: ["selected", "otherOne"],
  components: {
    vSelect
  },
  computed: {
    resources() {
      return this.$store.getters.resources;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>
