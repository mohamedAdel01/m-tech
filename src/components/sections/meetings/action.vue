<template>
  <section id="action" class="mb-2">
    <div class="bg-white rounded justify-content-between">
      <div class="p-3">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h6 class="font-weight-bold mb-2">{{data.title}}</h6>
          <div class="d-flex">
            <p class="mb-0">📝</p>
            <p class="px-3 mb-0">🗑</p>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-end">
          <div class="d-flex">
            <div>
              <p>Resolution type</p>
              <p>{{data.action_type.name}}</p>
            </div>
            <div class="mx-3 px-3 border-left">
              <p>Due date</p>
              <p>{{data.due_date}}</p>
            </div>
          </div>
          <div>
            <p class="mb-0">Comments</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["data"]
};
</script>

<style lang="scss">
</style>