<template>
  <ul class="p-0">
    <li class="d-flex align-items-center bg-secondary py-3 px-4 mb-2 rounded">
      <div class="col-4 px-0 py-1">{{$t('Name')}}</div>
      <div class="col-4 px-0 py-1 text-center">{{$t('Sending date')}}</div>
    </li>

    <li v-for="(user, i) in nonActivatedUsers" :key="i" class="d-flex align-items-center bg-white py-3 px-4 mb-2 rounded">
      <div class="col-4 px-0 py-1">
        <div class="d-flex align-items-center">
          <div>
            <img
              class="user-img rounded-circle"
              :src="user.picture_id ? user.picture_id : require('@/assets/images/default-avatar.jpg')"
            />
          </div>
          <div class="mx-2">
            <p
              v-if="user.translations.length"
              class="mb-0"
            >{{user.translations[0].title}} {{user.translations[0].name}}</p>
            <p class="text-black-50">{{user.email}}</p>
          </div>
        </div>
      </div>
      <div class="col-4 px-0 py-1 text-center">Monday 28 aug 2020</div>
      <div class="col-4 px-0 py-1 text-right">
        <div>⬜ ⬛</div>
        <div class="mt-3">
            <button class="btn btn-primary rounded-pill px-3 py-1">{{$t('Resending invitation')}}</button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
    computed: {
    nonActivatedUsers() {
      return this.$store.getters.nonActivatedUsers;
    }
  }
};
</script>

<style scoped>
.user-img {
    width: 60px;
}
</style>