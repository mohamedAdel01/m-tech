<template>
  <div id="voting-result" class="mb-5" data-aos="fade-down">
    <page-title
      mainTitle="Meetings"
      secTitle="Results of the voting on the date of the meeting"
      :replacements="{'1': 'meeting name'}"
    />

    <section class="mb-5">
      <h5 class="mb-4">{{$t('Voting result')}}</h5>
      <div class="d-flex align-items-center">
        <div class="w-50 mr-3">
          <h5>{{$t('First suggestion')}}</h5>
          <suggestion-sec bgcolor="bg-secondary" />
        </div>
        <div class="w-50 mr-3">
          <h5>{{$t('Second suggestion')}}</h5>
          <suggestion-sec bgcolor="bg-primary" />
        </div>
      </div>
    </section>

    <section class="mb-5">
      <h5 class="mb-4">{{$t('Members comments')}}</h5>
      <div class="bg-light p-4">
        <comment-sec />
        <comment-sec />
      </div>
    </section>

    <section class="bg-light p-4 mb-5" v-if="addAnotherSuggestion">
      <suggestions-form />
    </section>

    <section v-if="!addAnotherSuggestion">
      <div class="actions d-flex justify-content-between align-items-center">
        <button class="btn btn-primary rounded-pill">🔛 {{$t('Complete the meeting data')}}</button>
        <button
          class="btn btn-outline-primary rounded-pill mx-3"
          @click="addAnotherSuggestion = true"
        >◽ {{$t('Add another suggestion')}}</button>
      </div>
    </section>

    <section v-if="addAnotherSuggestion">
      <div class="actions d-flex justify-content-between align-items-center">
        <button class="btn btn-primary rounded-pill">🥈 {{$t('Send suggestions to members')}}</button>
        <button
          class="btn btn-outline-danger rounded-pill mx-3"
          @click="addAnotherSuggestion = false"
        >{{$t('Cancel')}}</button>
      </div>
    </section>
  </div>
</template>

<script>
import pageTitle from "@/components/theme/pageTitle.vue";
import commentSec from "@/components/sections/meetings/comment.vue";
import suggestionSec from "@/components/sections/meetings/suggestion.vue";
import suggestionsForm from "@/components/forms/meetings/suggestions.vue";

export default {
  components: {
    pageTitle,
    commentSec,
    suggestionSec,
    suggestionsForm
  },
  data() {
    return {
      suggestion: false,
      addAnotherSuggestion: false
    };
  }
};
</script>

<style lang="scss">
#voting-result {
}
</style>