<template>
  <section class="bg-light rounded p-3">
    <div class="bg-white rounded px-4 pt-4">
      <ul class="p-0">
        <li
          v-for="(config, i) in configurations"
          :key="i"
          :class="['py-3 m-0', config.status == 0 ? 'bg-light text-secondary' : '', i < configurations.length - 1 ? 'border-bottom' : '']"
        >
          <div class="d-flex justify-content-between align-items-center ml-3">
            <div class="d-flex">
              <div v-for="(text,i) in config.name" :key="i">
                <span>{{text}}</span>
                <span>
                  <input
                    v-if="i == 0"
                    type="number"
                    disabled
                    :value="config.status != 0 ? config.value1 : ''"
                    onkeypress="if(this.value.length==3) return false;"
                    class="rounded border mx-2 py-2 text-center font-weight-bold"
                  />
                  <input
                    v-if="i == 1 && config.name.length > 2"
                    type="number"
                    disabled
                    :value="config.status != 0 ? config.value2 : ''"
                    onkeypress="if(this.value.length==3) return false;"
                    class="rounded border mx-2 py-2 text-center font-weight-bold"
                  />
                </span>
              </div>
            </div>
            <div
              :class="['mx-4 px-4 py-1 rounded-pill text-white', config.status == 1 ? 'bg-warning': 'bg-danger']"
              v-if="config.status != 0"
            >{{config.status == 1 ? $t('Indicative') : $t('Mandatory')}}</div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      configurations: []
    };
  },
  computed: {
    board() {
      return this.$store.getters.itemPreview;
    }
  },
  watch: {
    board: {
      immediate: true,
      handler(val) {
        if (!val) return;
        this.configurations = val.accountconfiguration.reduce((a, b) => {
          let obj = {
            name: b.regulationconfiguration[0].name.split("%s"),
            status: b.status,
            value1: b.value1,
            value2: b.value1
          };

          a.push(obj);
          return a;
        }, []);
      }
    }
  }
};
</script>

<style scoped>
input {
  width: 50px;
}
</style>