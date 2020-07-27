<template>
  <b-form id="decission-form" class="bg-white" @submit.prevent>
    <div class="d-flex flex-wrap border-bottom pb-3">
        <b-form-group :label="$t('decision Title')" class="mb-2 col-12 px-2">
            <b-form-input type="text" v-model="$v.form.title.$model" :state="!$v.form.title.$error"  />
            <b-form-invalid-feedback>{{$t('This field should be selected')}}</b-form-invalid-feedback>
        </b-form-group>
        <div class="form-group col-12 px-2">
            <span class="d-inline-block font-13">{{ $t('Decision Type') }}</span>
            <v-select
            v-if="actionsTypes"
            id="vselect"
            label="name"
            v-model="$v.form.action_type.$model"
            :state="!$v.form.action_type.$error"
            :options="actionsTypes"
            />
        </div>

        <div class="form-group col-12 px-2">
            <span class="d-inline-block font-13">{{ $t('Select Agenda') }}</span>
            <v-select
            v-if="agendas"
            id="vselect"
            label="title"
            v-model="$v.form.agenda_id.$model"
            :state="!$v.form.agenda_id.$error"
            :reduce="option => option.id"
            :options="agendas"
            />
        </div>

        <div class="form-group col-12 px-2">
            <span class="d-inline-block font-13">{{ $t('Assigned to') }}</span>
            <v-select
            v-if="users"
            id="vselect"
            label="name"
            v-model="$v.form.assigned_id.$model"
            :state="!$v.form.assigned_id.$error"
            :options="users"
            />
        </div>

        <div class="form-group col-12 px-2">
            <span class="d-inline-block font-13">{{ $t('Due date') }}</span>
            <div class="date position-relative">
            <span class="position-absolute ico"></span>
            <datetime ref="date" v-model="$v.form.due_date.$model"></datetime>
            </div>
        </div>
        <div class="form-group col-12 px-2">
            <div class="my-3 border-bottom d-flex justify-content-between">
                <p>{{$t('Show to all attendees')}}</p>
                <toggle-button
                    :width="45"
                    :height="25"
                    color="var(--primary-color)"
                    @change="toggleShowTo($event)"
                />
            </div>
        </div>
        <b-form-group class="mb-2 col-12 px-2" :label="$t('Decision Description')">
            <b-textarea rows="3" v-model="$v.form.brief.$model" :state="!$v.form.brief.$error"></b-textarea>
        </b-form-group>
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
  props: ['agendas'],
  data() {
    return {
      options: [],
      showUploadAgendaFile: false,
      form: {
        title: null,
        brief: null,
        assigned_id: null,
        action_type: null,
        duration: null,
        is_work_agenda: false,
        has_hidden_voting: false,
        has_visible_voting: true,
        has_voting: false,
        due_date: null,
        show_to: null
      }
    };
  },
  computed: {
    users() {
      return this.$store.getters.resources.users;
    },
    actionsTypes() {
        return this.$store.getters.resources.actions_types;
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
      assigned_id: {
        required
      },
      duration: {
        required
      },
      agenda_id: {
        required
      },
      action_type:{
        required
      },
      due_date:{
          required
      },
      show_to: {
          required
      }
    }
  },
  methods: {
    resetForm(){
        this.form = {
            title: null,
            brief: null,
            assigned_id: null,
            action_type: null,
            duration: null,
            is_work_agenda: false,
            has_hidden_voting: false,
            has_visible_voting: true,
            has_voting: false,
            due_date: null,
            show_to: null
        }
    },
    setData(){
      return this.$data.form
    },
    toggleShowTo(e){
        if (e.value == true)
            this.form.show_to = "MEMBERS";
        else
            this.form.show_to = "ATTENDEES";        
    },
    activateAgendaVoting(e) {
      if (e.value == true) this.form.has_voting = true;
      else this.form.has_voting = false;
    },
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
