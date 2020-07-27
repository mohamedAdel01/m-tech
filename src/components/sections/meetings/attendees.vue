<template>
  <section id="attendees" class="mb-5">
    <div class="d-flex justify-content-between align-items-center">
      <h5 class="mb-2 font-16">{{$t('Attendees')}}</h5>
      <button class="btn btn-link mb-1 d-flex align-items-center" @click="$bvModal.show('abroad-members-modal')">
        <c-add-icon class="mx-2"/>
        <span>
        {{$t('An invitation to attendees from abroad')}}
        </span>
      </button>
    </div>
    <div class="bg-light p-3 rounded">
      <div class="rounded">
        <attendees-table :attendees="attendees" />
      </div>
    </div>
    <abroad-members-modal :attendees="attendees"  :agendas="agendas" @addAboardMembers="$emit('addAboardMembers',$event)" />
  </section>
</template>

<script>
import attendeesTable from "@/components/tables/meetings/attendees";
import abroadMembersModal from "@/components/modals/meetings/abroadMembers";
import cAddIcon from '@/components/SVG/c-add';
export default {
  components: {
    attendeesTable,
    abroadMembersModal,
    cAddIcon
  },
  props: ['attendees','agendas'],
  methods: {
    getAttendees(){
      //to add aboard attendees in future
      return this.attendees
    }
  }
};
</script>

<style lang="scss">
</style>