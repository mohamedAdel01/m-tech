<template>
  <b-modal id="delete-user-modal" hide-footer>
    <template v-slot:modal-header="{ close }">
      <h5 class="mb-0">{{$t('Delete user')}}</h5>
      <img class="pointer" src="@/assets/images/icons/close-circle.svg" @click="close()" />
    </template>

    <div v-if="user" :class="$i18n.locale == 'en' ? '' : 'rtl'">
      <div class="modal-body p-1">
        <p>{{$t('Are you sure you need to remove')}} {{user.translation.title + ' ' + user.translation.name}}</p>
      </div>
      <div class="text-right">
        <button
          class="btn btn-outline-secondary rounded-pill px-3 mx-3"
          @click="$bvModal.hide('delete-user-modal')"
        >{{$t('Back')}}</button>
        <button class="btn btn-danger rounded-pill px-3" @click="deleteUser">{{$t('Delete')}}</button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import mixins from "@/mixins";
export default {
  mixins: [mixins],
  props: ["user"],
  methods: {
    deleteUser() {
      this.handleRequest("USERS", "DELETE_USER", this.$props.user).then(res => {
        this.$bvModal.hide("delete-user-modal");
        this.$toasted.success(this.$t(res));
      });
    }
  }
};
</script>

<style lang="scss">
#delete-user-modal {
}
</style>