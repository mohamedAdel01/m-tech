<template>
  <div>
    <non-activated-users-table />
  </div>
</template>

<script>
import nonActivatedUsersTable from "@/components/tables/users/nonActivatedUsers";
import mixins from "@/mixins";

export default {
  mixins: [mixins],
  components: {
    nonActivatedUsersTable
  },
  created() {
    this.handleRequest("USERS", "SHOW_USERS", 0);
  }
};
</script>
