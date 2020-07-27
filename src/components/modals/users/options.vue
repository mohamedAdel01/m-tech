<template>
  <b-modal id="options-modal" hide-footer>
    <template v-slot:modal-header="{ close }">
      <h5 class="mb-0">{{$t('Options')}}</h5>
      <img class="pointer" src="@/assets/images/icons/close-circle.svg" @click="close()" />
    </template>

    <div :class="$i18n.locale == 'en' ? '' : 'rtl'">
      <div class="modal-body p-1">
        <ul class="p-0">
          <li class="p-4 pointer" @click="$emit('assignSecretary')">
            <img src="@/assets/images/icons/user-circle.svg" />
            <span class="mx-3">{{$t('Assign secretary')}}</span>
          </li>
          <hr class="m-0"/>
          <li class="p-4 pointer" @click="editUser">
            <img src="@/assets/images/icons/small-edit.svg" />
            <span class="mx-3">{{$t('Edit')}}</span>
          </li>
          <hr class="m-0"/>
          <li class="p-4 pointer" @click="$emit('deleteUser')">
            <img src="@/assets/images/icons/bin.svg" />
            <span class="mx-3">{{$t('Delete')}}</span>
          </li>
        </ul>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { Bus } from "@/main";
export default {
  props: ["user"],
  methods: {
    editUser() {
      this.$bvModal.hide("options-modal");
      Bus.$emit("EditUser", this.$props.user);
    }
  }
};
</script>

<style lang="scss">
#options-modal {
  .modal-body {
    padding: 0 !important;
    li {
      transition: 0.4s;
      &:hover {
        transform: translate(10px, 0px);
        color: var(--primary-color);
        &:lang(ar) {
          transform: translate(-10px, 0px);
        }
      }
    }
  }
}
</style>