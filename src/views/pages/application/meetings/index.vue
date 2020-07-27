<template>
  <div id="meetings" class="mb-5" data-aos="fade-down">
    <page-title mainTitle="Meetings" />

    <div class="text-right mb-3">
      <router-link to="/meetings/create" class="btn btn-primary rounded-pill font-14">{{$t('Add meeting')}}</router-link>
    </div>

    <section class="bg-light rounded p-3 mb-4">
      <div class="d-flex justify-content-between align-items-center">
        <p
          @click="showSearchSettings = true"
          class="text-black-50 font-18 mb-0"
        >{{$t('Search here')}}</p>
        <search-settings-icon
          @click="showSearchSettings = true"
          v-show="!showSearchSettings"
          class="pointer"
          v-b-tooltip.hover
          :title="$t('Detailed search')"
        />
        <close-search-icon
          @click="showSearchSettings = false"
          v-show="showSearchSettings"
          class="pointer"
          v-b-tooltip.hover
          :title="$t('Close search')"
        />
      </div>

      <div class="bg-white rounded p-3 mt-4" v-show="showSearchSettings">
        <search-form />
        <div class="text-right">
          <button class="btn btn-primary rounded-pill px-4">{{$t('Search')}}</button>
        </div>
      </div>
    </section>

    <section class="bg-light rounded p-3" data-aos="fade-right">
      <meeting-card-sec v-for="(meeting,index) in meetings" :key="index" :meeting="meeting" />
    </section>
  </div>
</template>

<script>
import pageTitle from "@/components/theme/pageTitle.vue";
import searchForm from "@/components/forms/meetings/search.vue";
import meetingCardSec from "@/components/sections/meetings/meetingCard.vue";
import searchSettingsIcon from "@/components/SVG/searchSettings";
import closeSearchIcon from "@/components/SVG/closeSearch";
import mixins from "@/mixins";
export default {
  mixins: [mixins],
  data() {
    return {
      showSearchSettings: false
    };
  },
  components: {
    pageTitle,
    searchForm,
    meetingCardSec,
    searchSettingsIcon,
    closeSearchIcon
  },
  computed:{
    meetings(){
      return this.$store.getters.meetings
    }
  },
  mounted(){
      this.handleRequest('MEETINGS','SHOW_MEETINGS')
  }
};
</script>
