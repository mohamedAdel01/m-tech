<template>
  <section class="text-center bg-light rounded p-4">
    <div class="bg-light rounded">
      <div class="text-center">
        <textarea class="border-0 rounded p-4 w-100" :placeholder="$t('Write a comment')" rows="4"></textarea>
      </div>
      <div class="d-flex justify-content-end mt-3">
        <button class="border-0 rounded-pill px-4 p-2 btn-primary">{{$t('Addition')}}</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style>
</style>