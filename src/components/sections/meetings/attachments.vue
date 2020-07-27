<template>
  <section id="attachments-sec" class="mb-5">
    <div class="d-flex justify-content-between align-items-center">
      <h5 class="mb-2 font-16">{{$t("Meeting attachments")}}</h5>
      <button
        v-if="attachments"
        class="btn btn-link"
        @click="$bvModal.show('attachments-modal')"
      >{{$t('Add attachment')}}</button>
    </div>
    <empty
      v-if="!attachments"
      p="You have not added meeting attachments"
      button="Add attachment"
      @click="$bvModal.show('attachments-modal')"
    />

    <section v-if="attachments" class="bg-light rounded px-3">
      <div
        v-for="(attachment,index) in attachments" :key="index"
        :class="['d-flex justify-content-between align-items-center py-4', index < attachments.length ? 'border-bottom':'']"
      >
        <div>
          <p class="mb-0">{{attachment.title}}</p>
        </div>
        <div class="d-flex">
          <p class="mb-0">🔵</p>
          <p class="px-2 mb-0">📝</p>
          <p class="mb-0">🗑</p>
        </div>
      </div>
    </section>

    <attachments-modal @attachmentUploaded="$emit('attachmentUploaded')" />
  </section>
</template>

<script>
import empty from "@/components/theme/empty";
import attachmentsModal from "@/components/modals/meetings/attachments.vue";
export default {
  props: ["attachments"],
  components: {
    empty,
    attachmentsModal
  }
};
</script>

<style lang="scss">
#attachments-sec {
}
</style>