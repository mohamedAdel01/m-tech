<template>
  <ul class="p-0">
    <li class="d-flex align-items-center bg-secondary py-3 px-4 mb-2 rounded">
      <div class="col-4 px-0 py-1">{{$t('Name')}}</div>
      <div class="col-4 px-0 py-1 text-center">{{$t('User role')}}</div>
    </li>

    <li
      v-for="(user, i) in activatedUsers"
      :key="i"
      class="d-flex align-items-center bg-white py-3 px-4 mb-2 rounded"
    >
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
              class="mb-0"
            >{{user.translation.title}} {{user.translation.name}}</p>
            <p class="text-black-50">{{user.email}}</p>
          </div>
        </div>
      </div>
      <div class="col-4 px-0 py-1 text-center">{{user.role.name}}</div>
      <div class="col-4 px-0 py-1 text-right">
        <img
          v-if="user.role_id !== 1"
          class="px-2 pointer"
          v-b-tooltip.hover
          :title="$t('View user')"
          @click="$emit('viewUser', user)"
          src="@/assets/images/icons/eye.svg"
        />
        <img
          v-if="user.role_id === 1"
          class="px-2 pointer"
          v-b-tooltip.hover
          :title="$t('Edit')"
          @click="editUser(user)"
          src="@/assets/images/icons/edit.svg"
        />
        <img
          v-if="user.role_id !== 1"
          class="px-2 pointer"
          v-b-tooltip.hover
          :title="$t('Options')"
          @click="$emit('openOptions', user)"
          src="@/assets/images/icons/dots.svg"
        />
      </div>
    </li>
  </ul>
</template>

<script>
import { Bus } from "@/main";
export default {
  methods: {
    editUser(user) {
      Bus.$emit("EditUser", user);
    }
  },
  computed: {
    activatedUsers() {
      return this.$store.getters.activatedUsers;
    }
  }
};
</script>

<style scoped>
.user-img {
  width: 60px;
}
</style>