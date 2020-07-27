<template>
  <div data-aos="fade-down">
    <page-title mainTitle="Users" :rightTitle="usersNumber" />
    <div class="text-right mb-3">
      <button
        class="btn btn-primary rounded-pill"
        @click="openUserModal('add-edit-user-modal', null)"
      >{{$t('Add new user')}}</button>
    </div>
    <tabs-sec />
    <div class="bg-light rounded p-3">
      <div class="d-flex align-items-center justify-content-center" v-show="loading">
        <b-spinner variant="primary" label="Spinning"></b-spinner>
      </div>
      <div v-show="!loading">
        <router-view data-aos="fade-right" />
      </div>
    </div>
    <add-edit-user-modal :user="user" />
  </div>
</template>

<script>
import { Bus } from "@/main";
import mixins from "@/mixins";
import pageTitle from "@/components/theme/pageTitle";
import tabsSec from "@/components/sections/users/tabs";
import addEditUserModal from "@/components/modals/users/addEditUser.vue";

export default {
  mixins: [mixins],
  data() {
    return {
      user: null
    };
  },
  computed: {
    usersNumber() {
      return this.$store.getters.usersNumber;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  components: {
    pageTitle,
    tabsSec,
    addEditUserModal
  },
  methods: {
    openUserModal(modal, user) {
      this.user = user;
      this.$bvModal.show(modal);
    }
  },
  created() {
    this.handleRequest("COMMON", "RESOURCES", "nationalities,roles");
  },
  mounted() {
    Bus.$on("EditUser", user => {
      this.openUserModal("add-edit-user-modal", user);
    });
  }
};
</script>


