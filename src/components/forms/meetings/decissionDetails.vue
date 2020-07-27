<template>
  <b-form id="decission-form" class="bg-white" @submit.prevent>
    <div class="d-flex flex-wrap border-bottom pb-3">
      <b-form-group :label="$t('Decission title')" class="mb-2 col-12 px-2">
        <b-form-input type="text" v-model="$v.form.title.$model" :state="!$v.form.title.$error" />
        <b-form-invalid-feedback>{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group class="mb-2 col-12 px-2" :label="$t('Brief description of the Decission')">
        <b-textarea rows="3" v-model="$v.form.brief.$model" :state="!$v.form.duration.$error"></b-textarea>
      </b-form-group>

      <div class="form-group col-12 px-2">
        <span class="d-inline-block font-13">{{ $t('Related to board/committee') }}</span>
        <v-select
          v-if="users"
          id="vselect"
          label="name"
          v-model="$v.form.assignee_id.$model"
          :state="!$v.form.assignee_id.$error"
          :options="users"
        />
      </div>

      <div class="form-group col-12 px-2">
        <span class="d-inline-block font-13">{{ $t('Voting') }}</span>
        <v-select
          v-if="users"
          id="vselect"
          label="name"
          v-model="$v.form.assignee_id.$model"
          :state="!$v.form.assignee_id.$error"
          :options="users"
        />
      </div>

      <div class="form-group col-12 px-2">
        <span class="d-inline-block font-13">{{ $t('Decission date') }}</span>
        <div class="date position-relative">
          <span class="position-absolute ico"></span>
          <datetime ref="date" v-model="date"></datetime>
        </div>
      </div>
    </div>

    <div class="py-3">
      <h6>{{$t('Attach files')}}</h6>
      <div>
        <input type="file" class="d-none" multiple ref="agendaAttachment" />
        <button
          class="btn border w-100"
          @click="$refs.agendaAttachment.click()"
        >▫️ {{$t('Choose files')}}</button>
      </div>
    </div>
  </b-form>
</template>

<script>
import { ToggleButton } from "vue-js-toggle-button";
import vSelect from "vue-select";
import { validationMixin } from "vuelidate";
import { required, boolean } from "vuelidate/lib/validators";
import "vue-select/dist/vue-select.css";
import { Datetime } from "vue-datetime";
import "vue-datetime/dist/vue-datetime.css";
export default {
  mixins: [validationMixin],
  components: {
    ToggleButton,
    vSelect,
    Datetime
  },
  data() {
    return {
      options: [],
      showUploadAgendaFile: false,
      form: {
        title: null,
        brief: null,
        assignee_id: null,
        duration: null,
        is_work_agenda: false,
        has_hidden_voting: false,
        has_visible_voting: true,
        has_voting: false
      }
    };
  },
  computed: {
    users() {
      return this.$store.getters.resources.users;
    }
  },
  validations: {
    form: {
      title: {
        required
      },
      brief: {
        required
      },
      assignee_id: {
        required
      },
      duration: {
        required
      }
    }
  },
  methods: {
    activateAgendaVoting(e) {
      if (e.value == true) this.form.has_voting = true;
      else this.form.has_voting = false;
    },
    assignFileToAgenda(e) {},
    uploadFile() {}
  }
};
</script>

<style lang="scss">
#decission-form {
  .vs__actions {
    padding: 4px 8px 0 0 !important;
  }

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
