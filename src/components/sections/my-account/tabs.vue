<template>
  <section class="d-flex justify-content-center bg-light rounded-pill py-3 mb-4">
    <div
      @click="$router.push('/my-account/personal-info')"
      :class="['text-white rounded-pill min-w-200 text-center py-2 pointer mx-3', currentStep == 'personal-info' ? 'bg-primary' : 'bg-secondary text-dark']"
    >{{$t('My personal info')}}</div>
    <div
      @click="$router.push('/my-account/password')"
      :class="['text-white rounded-pill min-w-200 text-center py-2 pointer mx-3', currentStep == 'password' ? 'bg-primary' : 'bg-secondary text-dark']"
    >{{$t('Password')}}</div>
    <div
      @click="$router.push('/my-account/the-secretary')"
      :class="['text-white rounded-pill min-w-200 text-center py-2 pointer mx-3', currentStep == 'the-secretary' ? 'bg-primary' : 'bg-secondary text-dark']"
    >{{$t('the Secretary')}}</div>
    <div
      @click="$router.push('/my-account/boards-committees')"
      :class="['text-white rounded-pill min-w-200 text-center py-2 pointer mx-3', currentStep == 'boards-committees' ? 'bg-primary' : 'bg-secondary text-dark']"
    >{{$t('Boards and Committees')}}</div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentStep: "personal-info"
    };
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        this.currentStep = to.path.split("/").pop();
        window.scrollTo(0, top);
      }
    }
  },
  mounted() {
    this.currentStep = this.$route.path.split("/").pop();
  }
};
</script>
<style lang="scss" scoped>
.min-w-200 {
  min-width: 200px;
  transition: 0.4s ease-in-out;
}
</style>