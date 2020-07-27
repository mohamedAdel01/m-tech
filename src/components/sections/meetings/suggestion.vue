<template>
  <section id="suggestion">
    <div class="bg-light p-4 rounded">
      <div class="d-flex justify-content-center align-items-stretch py-3">
        <div class="bg-white p-2 w-75 rounded p-3">
          <p class="mb-2">{{$t('Start meeting')}}: 5 Jan 2020- 10:00am</p>
          <p class="mb-2">{{$t(' meeting')}}: 7 Jan 2020- 03:00pm</p>
        </div>
        <div
          :class="['w-25 p-2 d-flex justify-content-center align-items-center right rounded p-3 text-white mx-3', bgcolor]"
        >
          <p class="mb-0 h3">30%</p>
        </div>
      </div>

      <div>
        <h5 class="font-weight-bold">{{$t('Voted by')}}:</h5>
        <div class="d-flex flex-wrap">
          <p class="mx-1">Mr.Hamad Alshahrany</p>
          <p class="mx-1">Dr.Abdelrhman Alghamdy</p>
          <p class="mx-1">Eng.Abdallah Ahmed</p>
          <p class="mx-1">Mr.Hamad Alshahrany</p>
          <p class="mx-1">Dr.Abdalrhman Alghamdy</p>
          <p class="mx-1">Eng.Abdallah Ahmed</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["bgcolor"]
};
</script>

<style lang="scss">
#suggestion {
}
</style>