<template>
  <div id="voting" class="mb-5" data-aos="fade-down">
    <page-title
      mainTitle="Meetings"
      secTitle="Vote on the date of the meeting"
      :replacements="{'1': 'meeting name'}"
    />

    <section class="mb-5">
      <h5>{{$t('Voting proposals')}}</h5>
      <div class="d-flex flex-wrap">
        <vote-sec />
        <vote-sec />
      </div>
    </section>

    <section>
      <h5 class="mb-3">{{$t('Add a comment / suggestion')}}</h5>
      <add-comment-sec />
    </section>
  </div>
</template>

<script>
import pageTitle from "@/components/theme/pageTitle.vue";
import commentSec from "@/components/sections/meetings/comment.vue";
import voteSec from "@/components/sections/meetings/vote.vue";
import addCommentSec from "@/components/sections/meetings/addComment.vue";

export default {
  components: {
    pageTitle,
    commentSec,
    voteSec,
    addCommentSec
  }
};
</script>

<style lang="scss">
#voting-result {
}
</style>