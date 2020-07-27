<template>
  <div>
    <activated-users-table
      @openOptions="openModal($event, 'options-modal')"
      @viewUser="openModal($event, 'view-user-modal')"
    />
    <options-modal @deleteUser="showDeleteModal" @assignSecretary="showAssignSecretaryModal" :user="user" />
    <delete-user-modal :user="user" />
    <view-user-modal :user="user" />
    <assign-secretary-modal :user="user" />
  </div>
</template>

<script>
import mixins from "@/mixins";
import activatedUsersTable from "@/components/tables/users/activatedUsers";
import optionsModal from "@/components/modals/users/options.vue";
import viewUserModal from "@/components/modals/users/viewUser.vue";
import deleteUserModal from "@/components/modals/users/deleteUser.vue";
import assignSecretaryModal from "@/components/modals/users/assignSecretary.vue";

export default {
  mixins: [mixins],
  components: {
    activatedUsersTable,
    optionsModal,
    viewUserModal,
    deleteUserModal,
    assignSecretaryModal
  },
  data() {
    return {
      user: null
    };
  },
  methods: {
    openModal(user, modal) {
      this.user = user;
      this.$bvModal.show(modal);
    },
    showDeleteModal() {
      this.$bvModal.hide("options-modal");
      this.$bvModal.show("delete-user-modal");
    },
    showAssignSecretaryModal() {
      this.$bvModal.hide("options-modal");
      this.$bvModal.show("assign-secretary-modal");
    }
  },
  created() {
    this.handleRequest("USERS", "SHOW_USERS", 1);
  }
};
</script>
