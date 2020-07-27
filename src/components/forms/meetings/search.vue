<template>
  <b-form id="meeting-info" @submit.prevent>
    <div class="d-flex flex-wrap">
      <b-form-group :label="$t('Meeting Title')" class="mb-4 col-md-6 col-12 px-2">
        <b-form-input type="text" v-model="$v.form.title.$model" :state="!$v.form.title.$error" />
        <b-form-invalid-feedback>{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group :label="$t('Meeting Number')" class="mb-4 col-md-6 col-12 px-2">
        <b-form-input
          type="number"
          v-model="$v.form.number.$model"
          :state="!$v.form.number.$error"
        />
        <b-form-invalid-feedback>{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>

      <div class="form-group col-md-6 col-12 px-2">
        <span class="d-inline-block font-13">{{ $t('Board / Committee') }}</span>
        <v-select id="vselect" label="name" :options="options" />
      </div>

      <div class="form-group col-md-6 col-12 px-2">
        <span class="d-inline-block font-13">{{ $t('Meeting status') }}</span>
        <v-select id="vselect" label="name" :options="options" />
      </div>

      <b-form-group :label="$t('Meeting end')" class="mb-4 col-md-6 col-12 px-2">
        <div class="date position-relative">
          <span class="position-absolute ico"></span>
          <datetime ref="date" v-model="date"></datetime>
        </div>

        <b-form-invalid-feedback>{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>
    </div>

  </b-form>
</template>

<script>
import suggestionsForm from "./suggestions";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { Datetime } from "vue-datetime";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import "vue-datetime/dist/vue-datetime.css";
export default {
  mixins: [validationMixin],
  components: {
    suggestionsForm,
    vSelect,
    Datetime
  },
  data() {
    return {
      form: {
        title: null,
        number: null
      },
      options: [],
      date: null,
      suggestion: false,
      test: 1
    };
  },
  watch: {
    suggestion: {
      immediate: true,
      handler(val) {
        this.$emit("suggestion", val);
      }
    }
  },
  validations: {
    form: {
      title: {
        required
      },
      number: {
        required
      }
    }
  }
};
</script>

<style lang="scss">
#meeting-info {
  .date {
    .ico {
      bottom: 0;
      background: #eee;
      height: 100%;
      width: 2.5rem;
      border: 1px solid #ced4da;
      border-radius: 0.25rem 0 0 0.25rem;
    }
  }
}
</style>
