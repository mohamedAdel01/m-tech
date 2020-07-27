<template>
  <b-modal id="view-user-modal" hide-footer>
    <template v-slot:modal-header="{ close }">
      <h5 class="mb-0">{{$t('User details')}} {{user.translation.name}}</h5>
      <img class="pointer" src="@/assets/images/icons/close-circle.svg" @click="close()" />
    </template>

    <div v-if="user" :class="$i18n.locale == 'en' ? '' : 'rtl'">
      <div class="modal-body p-0">
        <div class="bg-light p-3 rounded">
          <div class="bg-white rounded p-3">
            <div class="d-flex align-items-center">
              <img class="user-pic rounded-circle" src="@/assets/images/default-avatar.jpg" />
              <p class="mx-3 mb-0">{{user.translation.title}} {{user.translation.name}}</p>
            </div>
            <div class="mt-3 d-flex border-bottom mb-3 pb-3">
              <p class="col-4 px-0">
                <c-picker-icon />
                <span class="mx-2">{{user.nationality.name}}</span>
              </p>
              <p class="col-4 px-0 mx-2">
                <c-phone-icon />
                <span class="mx-2">{{user.mobile}}</span>
              </p>
              <p class="col-4 px-0">
                <c-mail-icon />
                <span class="mx-2">{{user.email}}</span>
              </p>
            </div>
            <div class="d-flex">
              <div class="w-50">
                <p class="text-black-50 mb-0">{{$t('Role')}}</p>
                <p>{{user.role.name}}</p>
              </div>
              <div class="w-50">
                <p class="text-black-50 mb-0">{{$t('Birth date')}}</p>
                <p>{{user.birth_date || 'Not exist'}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-right mt-3">
        <button
          class="btn btn-link text-primary"
          @click="$bvModal.hide('view-user-modal')"
        >{{$t('Close')}}</button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import cPickerIcon from "@/components/SVG/c-picker";
import cPhoneIcon from "@/components/SVG/c-phone";
import cMailIcon from "@/components/SVG/c-mail";
export default {
  props: ["user"],
  components: {
    cPickerIcon,
    cPhoneIcon,
    cMailIcon
  }
};
</script>

<style lang="scss">
#view-user-modal {
  .user-pic {
    height: 55px;
    width: 55px;
  }
}
</style>