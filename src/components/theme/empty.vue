<template>
  <div
    class="empty position-relative d-flex justify-content-md-center justify-content-between align-items-center bg-light py-4 rounded"
  >
    <p class="mb-0 font-14 text-black-50 font-weight-bold">{{$t(p)}}</p>
    <button class="btn btn-primary rounded-pill position-absolute" @click="$emit('click')">
      <img src="@/assets/images/icons/white-c-add.svg" />
      {{$t(button)}}
    </button>
  </div>
</template>

<script>
import cAddIcon from "@/components/SVG/c-add";
export default {
  props: ["p", "button"]
};
</script>

<style lang="scss">
.empty {
  button {
    right: 20px;
    &:lang(ar) {
      right: auto;
      left: 20px;
    }
  }
}
</style>