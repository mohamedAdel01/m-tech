<template>
  <section class="bg-light rounded p-3">
    <h6 class="mb-3">{{$t('Meetings')}}</h6>
    <meetings-table />
    <div class="text-right">
      <button class="btn btn-primary rounded-pill px-3">{{$t('Attendance of members')}}</button>
    </div>
  </section>
</template>

<script>
import meetingsTable from "@/components/tables/boards-committees/meetings.vue";

export default {
  components: {
    meetingsTable
  }
};
</script>

<style>
</style>