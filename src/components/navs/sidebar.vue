<template>
  <div id="sidebar" class="position-fixed border-right" data-aos="fade-right">
    <ul class="p-0 mt-4">
      <li
        :class="['pointer mr-4 my-1', selectedPath == item.id ? 'active bg-primary text-white' : '']"
        v-for="(item,i) in menuItems.top"
        :key="'top' + i"
        @click="$router.push(item.to)"
      >
        <div class="ml-4 d-flex align-items-center">
          <component :is="item.component" />
          <span class="mx-3 font-14">{{$t(item.label)}}</span>
        </div>
      </li>

      <hr />
      <li
        :class="['pointer mr-4 my-1', selectedPath == item.id ? 'active bg-primary text-white' : '']"
        v-for="(item,i) in menuItems.middle"
        :key="'mid' + i"
        @click="$router.push(item.to)"
      >
        <div class="ml-4 d-flex align-items-center">
          <component :is="item.component" />
          <span class="mx-3 font-14">{{$t(item.label)}}</span>
        </div>
      </li>
      <hr />

      <li
        :class="['last pointer mr-4 my-1', selectedPath == item.id ? 'active bg-primary text-white' : '']"
        v-for="(item,i) in menuItems.bottom"
        :key="'last' + i"
        @click="logout"
      >
        <div class="ml-4 d-flex align-items-center">
          <component :is="item.component" />
          <span class="mx-3 font-14">{{$t(item.label)}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import boardsIcon from "@/components/SVG/boards";
import decissionsIcon from "@/components/SVG/decissions";
import meetingsIcon from "@/components/SVG/meetings";
import homeIcon from "@/components/SVG/home";
import usersIcon from "@/components/SVG/users";
import myAccountIcon from "@/components/SVG/myAccount";
import logoutIcon from "@/components/SVG/logout";
import menuItems from "../../constants/sidebar";
import mixins from "@/mixins";
export default {
  mixins: [mixins],
  components: {
    boardsIcon,
    decissionsIcon,
    meetingsIcon,
    homeIcon,
    usersIcon,
    myAccountIcon,
    logoutIcon
  },
  data() {
    return {
      selectedPath: "home",
      menuItems
    };
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        this.selectedPath = to.path.split("/")[1];
        window.scrollTo(0, top);
      }
    }
  },
  methods: {
    logout() {
      this.handleRequest("REGISTRATION", "LOGOUT", null).then(res => {
        this.$toasted.success(this.$t("Logged out Successfully"));
        this.$router.push("company-name");
      });
    }
  },
  mounted() {
    this.selectedPath = this.$route.path.split("/")[1];
  }
};
</script>

<style lang="scss">
#sidebar {
  left: 0;
  width: 270px;
  height: calc(100vh - 70px);
  overflow-y: auto;
  overflow-x: hidden;
  li {
    padding: 13px 0;
    border-radius: 0 12px 12px 0;
    list-style: none;
    transition: 0.3s linear;
    &:lang(ar) {
      border-radius: 12px 0 0 12px;
    }
    &.active {
      &:hover {
        transform: translate(0px, 0px) !important;
        color: white !important;
      }
    }
    &:hover {
      transform: translate(10px, 0px);
      color: var(--primary-color);
      &:lang(ar) {
        transform: translate(-10px, 0px);
      }
    }
    &.last {
      &:hover {
        color: var(--danger-color);
      }
    }
  }
  &:lang(ar) {
    left: auto;
    right: 0;
  }
}
</style>
