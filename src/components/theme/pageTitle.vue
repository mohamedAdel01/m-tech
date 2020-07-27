<template>
  <section class="mb-4">
    <div
      class="bg-secondary rounded d-flex justify-content-between align-items-center font-weight-bold py-3 px-3"
    >
      <h3 :class="['h4 mb-0 font-weight-bold', titleColor ? titleColor : '']">{{$t(mainTitle)}}</h3>
      <h4 class="mb-0" v-if="status || rightTitle">
        <span v-if="status" class="badge badge-pill badge-primary px-3">{{$t(status)}}</span>
        <span v-else class="text-black-50 font-weight-bold px-3">{{$t(rightTitle)}}</span>
      </h4>
    </div>
    <breadcrumb :replacements="replacements" />
    <div class="mt-4" v-if="secTitle">
      <h4 class="text-primary font-20">{{$t(secTitle)}}</h4>
    </div>
  </section>
</template>

<script>
import breadcrumb from "@/components/navs/breadcrumb.vue";
export default {
  props: ["mainTitle", "secTitle", "titleColor", "status", "replacements","rightTitle"],
  components: {
    breadcrumb
  }
};
</script>

<style lang="scss">
.title {
  background: #eee;
  border-radius: 12px;
}
</style>