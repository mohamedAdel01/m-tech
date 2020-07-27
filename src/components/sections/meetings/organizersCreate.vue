<template>
  <section id="organizers-sec" class="mb-5">
    <h5 class="mb-3 font-16">{{$t("Meeting organizers")}}</h5>
    <empty
      v-if="!organizers.organizers || !organizers.organizers.length"
      p="You have not added meeting organizers"
      button="Add organizers"
      @click="$bvModal.show('organizers-modal')"
    />
    <div v-else class="d-flex justify-content-end">
      <button class="btn btn-link" @click="openAddModal">{{$t('Add Organizers')}}</button>
    </div>

    <section v-if="organizers.organizers && organizers.organizers.length">
      <div class="p-3 bg-light rounded">
        <div v-for="(organizer,index) in organizers.organizers" :key="index" class="p-1">
          <div class="px-4 py-3 rounded-pill d-flex justify-content-between bg-white">
            <div>
              <p class="mb-0">{{organizer.name}}</p>
            </div>
            <div>
              <p class="mb-0">
                <span class="mx-3" @click="editOrganizer(organizer.id)">
                  <img class="pointer" style="width:17px" src="@/assets/images/icons/edit.svg" />
                </span>
                <span @click="deleteOrganizer(organizer.id)">
                  <img class="pointer" style="width:17px" src="@/assets/images/icons/bin.svg" />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <organizers-modal
      :organizers="organizers.organizers"
      ref="organizersModalForm"
      @setOrganizers="$emit('setOrganizers',$event)"
    />
  </section>
</template>

<script>
import { Bus } from "@/main";
import empty from "@/components/theme/empty";
import organizersModal from "@/components/modals/meetings/organizers.vue";

export default {
  props: ["organizers"],
  components: {
    empty,
    organizersModal
  },
  methods: {
    openAddModal() {
      this.$refs.organizersModalForm.form.editMode = false;
      this.$refs.organizersModalForm.form.organizer = null;
      this.$refs.organizersModalForm.disableCapabilities = true;
      this.$bvModal.show("organizers-modal");
    },
    editOrganizer(id) {
      this.$bvModal.show("organizers-modal");
      this.$refs.organizersModalForm.form.editMode = true;
      this.$refs.organizersModalForm.setOrganizer(id);
    },
    deleteOrganizer(id) {
      this.$emit("deleteOrganizer", id);
    }
  }
};
</script>
