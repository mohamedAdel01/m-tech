<template>
  <b-modal id="assign-secretary-modal" hide-footer>
    <template v-slot:modal-header="{ close }">
      <h5 class="mb-0">
        <span>{{$t('Assign secretary')}}</span>
      </h5>
      <img class="pointer" src="@/assets/images/icons/close-circle.svg" @click="close()" />
    </template>

    <div :class="$i18n.locale == 'en' ? '' : 'rtl'">
      <div class="modal-body p-1">
        <p class="font-16 mb-2">{{$t('Permissions')}}</p>
        <div>
          <div class="py-2 d-flex justify-content-between align-items-center mb-2">
            <p class="mb-0">option 1</p>
            <toggle-button :width="45" :height="25" color="var(--primary-color)" />
          </div>
        </div>
      </div>
      <div class="text-right">
        <button
          class="btn btn-outline-danger rounded-pill px-4 mx-3"
          @click="$bvModal.hide('assign-secretary-modal')"
        >{{$t('Cancel')}}</button>
        <button class="btn btn-primary rounded-pill px-4" @click="assignSecretary">{{$t('Save')}}</button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import mixins from "@/mixins";
import { ToggleButton } from "vue-js-toggle-button";
export default {
  mixins: [mixins],
  props: ["user"],
  components: {
    ToggleButton
  },
  methods: {
    assignSecretary() {
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