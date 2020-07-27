<template>
  <b-modal id="add-edit-user-modal" hide-footer>
    <template v-slot:modal-header="{ close }">
      <h5 class="mb-0 d-flex align-items-center text-black-50">
        <img src="@/assets/images/icons/user-circle.svg" alt />
        <span class="mx-2">{{$t(!user ? 'Add user': 'Edit user')}}</span>
      </h5>
      <img class="pointer" src="@/assets/images/icons/close-circle.svg" @click="close()" />
    </template>

    <div :class="$i18n.locale == 'en' ? '' : 'rtl'">
      <div class="modal-body p-1">
        <add-edit-user-form :user="user" ref="addEditUserForm" />
      </div>
      <div class="text-right">
        <button
          class="btn btn-link text-danger rounded-pill px-3 mx-3"
          @click="$bvModal.hide('add-edit-user-modal')"
        >{{$t('Cancel')}}</button>
        <button
          class="btn btn-primary rounded-pill px-3"
          @click="!user ? sendInvitation() : editUser()"
        >{{$t(!user ? 'Send invitation' : 'Edit user')}}</button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import mixins from "@/mixins";
import addEditUserForm from "@/components/forms/users/addEditUser.vue";

export default {
  mixins: [mixins],
  props: ["user"],
  components: {
    addEditUserForm
  },
  methods: {
    sendInvitation() {
      let form = this.$refs.addEditUserForm.checkData();
      if (!form)
        return this.$toasted.error(this.$t("Please provide a valid data"));
      this.handleRequest("USERS", "CREATE_USER", form).then(res => {
        this.$bvModal.hide("add-edit-user-modal");
        this.$toasted.success(this.$t(res));
      });
    },
    editUser() {
      let form = this.$refs.addEditUserForm.checkData();
      if (!form)
        return this.$toasted.error(this.$t("Please provide a valid data"));
      this.handleRequest("USERS", "EDIT_USER", form).then(res => {
        this.$bvModal.hide("add-edit-user-modal");
        this.$toasted.success(this.$t(res));
      });
    }
  }
};
</script>

<style lang="scss">
#options-modal {
  // .modal-body {
  //   padding: 0 !important;
  //   li {
  //     transition: 0.4s;
  //     &:hover {
  //       transform: translate(10px, 0px);
  //       color: var(--primary-color);
  //     }
  //   }
  // }
  .vs__actions {
    padding: 4px 50px 0 0;
  }
  // .search {
  //   .ico {
  //     bottom: 0;
  //     right: 0;
  //     background: #eee;
  //     height: 100%;
  //     width: 2.5rem;
  //     border: 1px solid #ced4da;
  //     border-radius: 0 0.25rem 0.25rem 0;
  //   }
  // }
}
</style>