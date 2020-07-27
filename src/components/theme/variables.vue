<template>
  <v-style>
    :root {
    --primary-color: {{ settings.primary }};
    --secondary-color: {{ settings.secondary }};
    --danger-color: {{ settings.danger }};
    --light-color: {{ settings.light }};
    --labels-color: {{ settings.labels }};
    --system-icons-color: {{ settings.systemIcons }};
    --side-icon-color: {{ settings.sideIcon }};
    --side-icon-active-color: {{ settings.sideIconActive }};
    }
  </v-style>
</template>

<script>
export default {
  computed: {
    settings() {
      return this.$store.getters.settings;
    }
  }
};
</script>

<style>
.primary {
  color: var(--primary-color);
}
.danger {
  color: var(--danger-color);
}
</style>