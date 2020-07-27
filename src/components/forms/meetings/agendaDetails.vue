<template>
  <b-form id="agenda-form" class="bg-white" @submit.prevent v-if="resources">
    <div class="d-flex flex-wrap border-bottom pb-3">
      <b-form-group :label="$t('agenda Title')" class="mb-2 col-12 px-2">
        <b-form-input type="text" v-model="$v.form.title.$model" :state="!$v.form.title.$error"  />
        <b-form-invalid-feedback>{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>

      <div class="form-group col-md-6 col-12 px-2">
        <span class="d-inline-block font-13">{{ $t('Presenter') }}</span>
        <v-select  id="vselect" label="name"  v-model="$v.form.assignee_id.$model" :state="!$v.form.assignee_id.$error" 
        :get-option-label="option => option.translation.name"
        :options="resources.users" />
      </div>

      <b-form-group :label="$t('Duration in minutes')" class="mb-2 col-md-6 col-12 px-2">
        <b-form-input type="number" v-model="$v.form.duration.$model" :state="!$v.form.duration.$error" />
        <b-form-invalid-feedback>{{$t('This field is required')}}</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group class="mb-2 col-12 px-2" :label="$t('Brief description of the agenda')">
        <b-textarea rows="3" v-model="$v.form.brief.$model" :state="!$v.form.duration.$error"></b-textarea>
      </b-form-group>
    </div>

    <div class="py-3 border-bottom">
      <h5>{{$t('Attach files')}}</h5>
      <div>
        <input type="file" class="d-none" multiple ref="agendaAttachment" @change="uploadFile($event)" />
        <button class="btn border w-50" @click="$refs.agendaAttachment.click()">▫️ {{$t('Choose files')}}</button>
      </div>
    </div>

    <div class="my-3 border-bottom d-flex justify-content-between">
      <p>{{$t('Include this item in the agenda file')}}</p>
      <toggle-button
        :width="45"
        :height="25"
        color="var(--primary-color)"
        @change="assignFileToAgenda($event)"
      />
    </div>

    <div class="mb-5">
      <div class="d-flex justify-content-between">
        <p>{{$t('Activate the vote on the decisions of this Agenda')}}</p>
        <toggle-button
          :width="45"
          :height="25"
          color="var(--primary-color)"
          @change="activateAgendaVoting($event)"
        />
      </div>
      <div v-if="form.has_voting">
        <b-form-radio
          v-model="form.has_hidden_voting"
          name="voting-method"
          :value="true"
        >{{$t('Secret vote, none of the members ’votes appear')}}</b-form-radio>
        <b-form-radio
          name="voting-method"
          v-model="form.has_visible_voting"
          :value="true"
        >{{$t('Public vote, showing all members the voting results')}}</b-form-radio>
      </div>
    </div>
  </b-form>
</template>

<script>
import { ToggleButton } from "vue-js-toggle-button";
import vSelect from "vue-select";
import { validationMixin } from "vuelidate";
import { required,boolean } from "vuelidate/lib/validators";
import "vue-select/dist/vue-select.css";
import mixins from "@/mixins";
export default {
  mixins: [validationMixin, mixins],
  components: {
    ToggleButton,
    vSelect
  },
  props: ['editAgenda'],
  data() {
    return {
      options: [],
      showUploadAgendaFile:false,
      form: {
        id: Math.random()
        .toString(16)
        .slice(2),
        title: null,
        brief: null,
        assignee_id: null,
        duration: null,
        is_work_agenda: false,
        has_hidden_voting:false,
        has_visible_voting:true,
        has_voting: false,
        attachments: [],
        actions: []
      }
    };
  },
  computed:{
    resources() {
      return this.$store.getters.resources
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
  watch: {
    editAgenda: {
      immediate: true,
      handler(val) {
        if (val == null) return;
        this.form = {
          id: val.id,
          title: val.title,
          brief: val.brief,
          assignee_id: val.assignee_id,
          duration: val.duration,
          is_work_agenda: val.is_work_agenda,
          has_hidden_voting:val.has_hidden_voting,
          has_visible_voting:val.has_visible_voting,
          has_voting: val.has_voting,
          attachments: val.attachments,
          actions: val.actions
        }
      }
    }
  },
  methods: {
    resetForm(){
      this.form = {
        id: Math.random()
          .toString(16)
          .slice(2),
        title: null,
        brief: null,
        assignee_id: null,
        duration: null,
        is_work_agenda: false,
        has_hidden_voting:false,
        has_visible_voting:true,
        has_voting: false,
        attachments: [],
        actions: []
      }
    },
    uploadFile(e){
      if(e.target.files){
        const data = new FormData();
        data.append('file', e.target.files[0])
        this.handleRequest('FILES','UPLOAD_FILE',data).then(res => {
          this.form.attachments.push(this.$store.getters.uploadedFile)
        })
      }
    },
    assignFileToAgenda(e) {

    },
    setData(){
      return this.$data.form
    },
    activateAgendaVoting(e){
      if(e.value == true)
        this.form.has_voting = true
      else
        this.form.has_voting = false
    }
  }
};
</script>

<style lang="scss">
#agenda-form {
  .vs__actions {
    padding: 4px 8px 0 0 !important;
  }
}
</style>
