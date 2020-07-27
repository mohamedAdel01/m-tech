<template>
  <section id="organizers-sec" class="mb-5">
    <h5 class="mb-3 font-16">{{$t("Meeting organizers")}}</h5>
    <empty
      v-if="!organizers"
      p="You have not added meeting organizers"
      button="Add organizers"
      @click="$bvModal.show('organizers-modal')"
    />

    <section v-if="organizers">
      <div class="p-3 bg-light rounded">
        <div v-for="(organizer,index) in organizers" :key="index" class="p-1">
          <div class="px-4 py-3 rounded-pill d-flex justify-content-between bg-white">
            <div>
              <p class="mb-0" v-html="fullName(organizer)"></p>
            </div>
            <div>
              <p class="mb-0">📝 🗑</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <organizers-modal @setOrganizers="$emit('setOrganizers',$event)" />
  </section>
</template>

<script>
import empty from "@/components/theme/empty";
import organizersModal from "@/components/modals/meetings/organizers.vue";

export default {
  props: ['organizers'],
  components: {
    empty,
    organizersModal
  },
  methods: {
    fullName(user){
      if(user.user !== undefined)
        return user.user.translation.title +'/' + user.user.translation.name
      else
        return user.translation.title +'/' + user.translation.name
    }
  }
};
</script>

<style lang="scss">
#organizers {
}
</style>