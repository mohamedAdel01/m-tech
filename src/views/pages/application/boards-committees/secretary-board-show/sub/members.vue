<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="mb-0">{{$t('Board members')}}</h5>
      <button class="btn btn-primary rounded-pill px-4">{{$t('Users log')}}</button>
    </div>
    <div class="bg-light p-3 rounded mb-3">
      <members-table />
    </div>

    <div class="d-flex bg-light rounded p-3">
      <p class="mb-0 text-black-50">{{$t('Board secretary')}}:</p>
      <p class="mb-0 px-2">{{board.secretary.translation.name}}</p>
    </div>
  </div>
</template>

<script>
import membersTable from "@/components/tables/boards-committees/members.vue";

export default {
  components: {
    membersTable
  },
  computed: {
    board() {
      return this.$store.getters.itemPreview
    }
  }
};
</script>
