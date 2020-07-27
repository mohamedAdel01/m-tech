<template>
  <b-modal id="agenda-modal" hide-footer>
    <template v-slot:modal-header="{ close }">
      <h5 class="mb-0"> {{$t('Add agenda')}}</h5>
      <img class="pointer" src="@/assets/images/icons/close-circle.svg" @click="close()" />
    </template>

    <div :class="$i18n.locale == 'en' ? '' : 'rtl'">
      <div class="modal-body p-1">
        <b-tabs pills card>
          <b-tab :title="$t('Agenda details')" active>
            <div>
              <agenda-details-form :editAgenda="editAgenda" ref="agendaDetailsForm" />
            </div>
          </b-tab>
          <b-tab :title="$t('Agenda powers')">
            <agenda-powers-form :editAgenda="editAgenda" ref="agendaPowersForm" />
          </b-tab>
        </b-tabs>
      </div>
      <div class="actions text-right">
        <button class="btn btn-outline-danger rounded-pill mx-2">{{$t('Cancel')}}</button>
        <button class="btn btn-primary rounded-pill px-4" @click="getAgendaFormsData">{{$t('Add')}}</button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import agendaDetailsForm from "@/components/forms/meetings/agendaDetails";
import agendaPowersForm from "@/components/forms/meetings/agendaPowers";
import { Datetime } from "vue-datetime";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import "vue-datetime/dist/vue-datetime.css";
export default {
  components: {
    agendaDetailsForm,
    agendaPowersForm,
    Datetime,
    vSelect
  },
  props: ['editAgenda'],
  methods:{
    getAgendaFormsData() {
        let agendaDetailsFormData = this.$refs.agendaDetailsForm.setData()
        let agendaPowersFormData = this.$refs.agendaPowersForm.setData()
        let agendaMergedObject = {...agendaDetailsFormData, ...agendaPowersFormData}
        if(this.editAgenda == null)
          this.$emit('addAgenda',agendaMergedObject)
        else
          this.$emit('editAgenda',agendaMergedObject)
        this.$refs.agendaDetailsForm.resetForm()
        this.$refs.agendaPowersForm.resetForm()
        this.$bvModal.hide('agenda-modal')
    }
  },
  data() {
    return {
      form: {

      },
      options: []
    };
  }
};
</script>

<style lang="scss">
#agenda-modal {
  .tabs {
    .card-body {
      padding: 0;
    }
    .card-header {
      background: none;
      display: flex;
      justify-content: center;
      border-bottom: none;
      margin-bottom: 15px;

      ul {
        border: 1px solid #ddd;
        border-radius: 50px;
        li {
          a {
            border-radius: 50px;
            padding: 5px 20px;
          }
        }
      }
    }
  }

  .vs__actions {
    padding: 4px 50px 0 0;
  }
  .search {
    .ico {
      bottom: 0;
      right: 0;
      background: #eee;
      height: 100%;
      width: 2.5rem;
      border: 1px solid #ced4da;
      border-radius: 0 0.25rem 0.25rem 0;
    }
  }
  .vue-js-switch {
    margin: 0;
  }
}
</style>