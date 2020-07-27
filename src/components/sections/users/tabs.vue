<template>
  <section class="d-flex justify-content-center bg-light rounded-pill py-3 mb-4">
    <div
        @click="$router.push('/users/activated')"
      :class="['text-white rounded-pill min-w-200 text-center py-2 pointer mr-4', currentStep == 'activated' ? 'bg-primary' : 'bg-secondary text-dark']"
    >{{$t('Company users')}}</div>
    <div
        @click="$router.push('/users/non-activated')"
      :class="['text-white rounded-pill min-w-200 text-center py-2 pointer ml-4', currentStep == 'non-activated' ? 'bg-primary' : 'bg-secondary text-dark']"
    >{{$t('Waiting for Activate')}}</div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentStep: "activated"
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