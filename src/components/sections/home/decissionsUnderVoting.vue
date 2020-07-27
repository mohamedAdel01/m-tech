<template>
  <section class="col-6 pl-3 pr-0">
    <div class="d-flex justify-content-between mb-2">
      <h6 class="mb-0">{{$t('Decissions under voting')}}</h6>
      <button class="btn btn-link p-0 font-14 text-black-50">{{$t('Show more')}}</button>
    </div>
    <div class="bg-light rounded p-3">
      <div v-for="(action,index) in actions" :key="index" class="bg-white rounded p-3 mb-3">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h6 class="mb-0">
            <router-link class="font-18 text-dark" to="/">{{action.title}}</router-link>
          </h6>
          <div class="d-flex align-items-center">
            <vote-icon class="pointer" v-b-tooltip.hover :title="$t('Vote')" />
          </div>
        </div>
        <div class="bg-white rounded mb-2">
          <div class="d-flex mb-3">
            <div class="py-1">
              <p class="mb-0 px-2 text-black-50 font-14">{{$t('Related to')}}</p>
              <p class="mb-0 px-2 font-16" v-if="action.committee">{{action.committee.translation.name}}</p>
            </div>
            <div class="py-1 border-left px-3 mx-3">
              <p class="mb-0 px-2 text-black-50 font-14">{{$t('Decission date')}}</p>
              <p class="mb-0 px-2 font-16">{{action.vote_ended_at}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import voteIcon from "@/components/SVG/vote";
export default {
  components: {
    voteIcon
  },
  props:['actions']
};
</script>
