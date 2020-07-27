<template>
  <section id="agendas" class="mb-5">
    <div class="d-flex justify-content-between align-items-center">
      <h5 class="mb-2 font-16">{{$t("Meeting agendas")}}</h5>
      <div v-if="agendas.length" class="d-flex justify-content-end">
        <button
          class="btn btn-link"
          @click="$bvModal.show('agenda-modal')"
        >🉐 {{$t('Add agenda')}}</button>
        <button class="btn btn-link px-2" @click="$bvModal.show('decission-modal')">🉐 {{$t('Add decission')}}</button>
      </div>
    </div>
    <empty
      v-if="!agendas.length"
      p="You have not added meeting agendas"
      button="Add agenda"
      @click="$bvModal.show('agenda-modal')"
    />

    <section v-for="(agenda,index) in agendas" :key="index" class="bg-light rounded border">
      <div class="p-3">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h6>{{agenda.title}}</h6>
          <div class="d-flex">
            <p class="mb-0" @click="openEditAgendaModal(agenda)">📝</p>
            <p class="px-3 mb-0">🗑</p>
            <p class="pointer" v-b-toggle.decissions>{{(agenda.actions) ? agenda.actions.length:0}}</p>
          </div>
        </div>
        <div class="d-flex">
          <p>🕦 {{agenda.duration}} min</p>
          <p class="px-3">🔵 {{agenda.attachments.length}}</p>
          <p>👨‍ {{agenda.assignee_id.name}}</p>
        </div>

        <div class="d-flex justify-content-between align-items-start">
          <p
            class="w-75"
          >{{agenda.brief}}</p>
          <p class="d-flex justify-content-end">Comments</p>
        </div>
      </div>
      <b-collapse id="decissions" class="mt-2">
        <div class="border-top p-3">
          <h6>{{$t('Decissions')}}</h6>
          <action-sec v-for="(action,index) in agenda.actions" :key="index" :data="action"/>
        </div>
      </b-collapse>
    </section>

    <agenda-modal @addAgenda="addAgenda($event)" @editAgenda="editAgendaCallback($event)" :editAgenda="editAgenda" />
    <decission-modal @addAction="addActionToAgenda($event)" @editAgenda="editAgendaCallback($event)" :agendas="agendas" />
  </section>
</template>

<script>
import empty from "@/components/theme/empty";
import agendaModal from "@/components/modals/meetings/agenda";
import actionSec from "./action";
import decissionModal from '@/components/modals/meetings/decission.vue';

export default {
  components: {
    empty,
    agendaModal,
    decissionModal,
    actionSec
  },
  props: ['agendasData'],
  data() {
    return {
      editAgenda:null,
      agendas: []
    };
  },
  mounted() {
    if(this.agendasData)
      this.agendas = this.agendasData
  },
  methods: {
    openEditAgendaModal(agenda){
      this.editAgenda = agenda
      this.$bvModal.show('agenda-modal')
    },
    addAgenda(agenda){
      this.agendas.push(agenda)
      this.$emit('setAgenda',this.agendas)
    },
    addActionToAgenda(action){
      this.agendas.map(agenda => {
        if (agenda.id !== action.agenda_id) return agenda;
        agenda.actions.push(action);
      });
    },
    addAction(action) {
      this.agendas.map(agenda => {
        if (agenda.id !== action.agenda_id) return agenda;
        agenda.actions.push(action);
      });
    },
    editAction(newAction) {
      this.agendas.map(agenda => {
        if (agenda.id !== newAction.agenda_id) return agenda;
        agenda.actions.map(action => {
          if (action.id !== newAction.id) return action;
          Object.assign(action, newAction);
        });
      });
    },
    deleteAction(action) {
      this.agendas.map(agenda => {
        if (agenda.id !== action.agenda_id) return agenda;
        agenda.actions = agenda.actions.filter(item => item.id !== action.id);
      });
    },
    editAgendaCallback(newAgenda) {
      this.agendas.map(agenda => {
        if (agenda.id !== newAgenda.id) return agenda;
        Object.assign(agenda, newAgenda);
      });
      this.$emit('setAgenda',this.agendas)
    },
    deleteAgenda(agenda) {
      this.agendas = this.agendas.filter(item => item.id !== agenda.id);
    }
  }
};
</script>

<style lang="scss">
#agendas {
}
</style>