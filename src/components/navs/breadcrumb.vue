<template>
  <b-breadcrumb class="m-0" :items="items" />
</template>

<script>
export default {
  props: ["replacements"],
  data() {
    return {
      items: [],
      ignoredItems: [
        "show",
        "voting-result",
        "voting",
        "info",
        "members",
        "powers",
        "settings",
        "board-show",
        "committee-show",
        "0"
      ]
    };
  },
  methods: {
    handleShow() {
      let newPath = "";
      this.items = [];
      this.$route.path.split("/").map((item, i) => {
        if (i < 1 || this.ignoredItems.includes(item)) return;
        newPath = `${newPath}/${item}`;
        this.items.push({
          text: this.$t(item),
          to: newPath
        });
      });

      if (!this.$props.replacements) return;
      Object.keys(this.$props.replacements).map(key => {
        this.items[Number(key)].text = this.$props.replacements[key];
      });
    }
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        this.handleShow();
        window.scrollTo(0, top);
      }
    }
  },
  mounted() {
    this.handleShow();
  }
};
</script>