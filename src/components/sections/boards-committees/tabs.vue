<template>
  <section class="mb-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="text-primary mb-0 font-20">{{title}}</h4>
      <button
        v-if="button"
        class="btn btn-primary rounded-pill px-3"
        @click="$router.push('/boards-committees/secretary-' + type + '-' + 'update/' + id)"
      >{{$t(button)}}</button>
    </div>

    <div class="d-flex justify-content-between bg-light p-4 rounded-pill line font-14">
      <div
        @click="$router.push('/boards-committees/secretary-' + type + '-' + service + '/' + id + '/info')"
        :class="['text-white rounded-pill min-w-200 text-center py-2 pointer', currentStep == 'info' ? 'bg-primary' : 'bg-secondary text-dark']"
      >{{$t(type.charAt(0).toUpperCase() + type.slice(1) + ' info')}}</div>
      <div
        @click="$router.push('/boards-committees/secretary-' + type + '-' + service + '/' + id + '/settings')"
        :class="['text-white rounded-pill min-w-200 text-center py-2 pointer', currentStep == 'settings' ? 'bg-primary' : 'bg-secondary text-dark']"
      >{{$t(type.charAt(0).toUpperCase() + type.slice(1) + ' settings')}}</div>
      <div
        @click="$router.push('/boards-committees/secretary-' + type + '-' + service + '/' + id + '/members')"
        :class="['text-white rounded-pill min-w-200 text-center py-2 pointer', currentStep == 'members' ? 'bg-primary' : 'bg-secondary text-dark']"
      >{{$t(type.charAt(0).toUpperCase() + type.slice(1) + ' members')}}</div>
      <div
        @click="$router.push('/boards-committees/secretary-' + type + '-' + service + '/' + id + '/powers')"
        :class="['text-white rounded-pill min-w-200 text-center py-2 pointer', currentStep == 'powers' ? 'bg-primary' : 'bg-secondary text-dark']"
      >{{$t(type.charAt(0).toUpperCase() + type.slice(1) + ' permissions')}}</div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["title", "button", "type", "id", "service"],
  data() {
    return {
      currentStep: "info"
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

.line {
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    right: 100px;
    left: 100px;
    top: 50%;
    height: 1px;
    width: 85%;
    background: var(--secondary-color);
    z-index: 1;
  }
  div {
    z-index: 2;
  }
}
</style>