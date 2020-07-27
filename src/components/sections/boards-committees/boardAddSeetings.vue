<template>
  <section class="bg-light rounded p-3">
    <div class="bg-white rounded py-4">
      <div class="d-flex align-items-center justify-content-center my-3" v-if="loading">
        <b-spinner variant="primary" label="Spinning"></b-spinner>
      </div>
      <ul v-if="!loading" class="p-0">
        <li
          v-for="(item,i) in configurations"
          :key="i"
          :class="[
            'm-0 py-2 px-4 d-flex justify-content-between align-items-center',
             item.status == 0 ? 'bg-light text-secondary' : '',
            i < configurations.length - 1 ? 'border-bottom' : ''
            ]"
        >
          <div class="d-flex align-items-center">
            <toggle-button
              :width="45"
              :height="25"
              color="var(--primary-color)"
              :value="item.status > 0 ? true : false"
              @change="$event.value == true ? item.status = 1 : item.status = 0"
            />
            <div class="d-flex ml-3">
              <div v-for="(text,i) in item.name" :key="i">
                <span>{{text}}</span>
                <span>
                  <input
                    v-if="i == 0"
                    type="number"
                    :disabled="item.status == 0"
                    v-model="item.value1"
                    onkeypress="if(this.value.length==3) return false;"
                    class="rounded border mx-2 py-2 text-center font-weight-bold"
                  />
                  <input
                    v-if="i == 1 && item.name.length > 2"
                    type="number"
                    :disabled="item.status == 0"
                    v-model="item.value2"
                    onkeypress="if(this.value.length==3) return false;"
                    class="rounded border mx-2 py-2 text-center font-weight-bold"
                  />
                </span>
              </div>
            </div>
          </div>
          <div>
            <div class="my-2 checks d-flex border rounded-pill bg-white">
              <div
                @click="item.status = 1"
                :class="['pointer w-50 py-2 text-center rounded-pill', item.status == 1 ? 'bg-warning text-white': 'bg-white']"
              >{{$t('Indicative')}}</div>
              <div
                @click="item.status = 2"
                :class="['pointer w-50 py-2 text-center bg-primary rounded-pill', item.status == 2 ? 'bg-danger text-white': 'bg-white']"
              >{{$t('Mandatory')}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { ToggleButton } from "vue-js-toggle-button";
export default {
  components: {
    ToggleButton
  },
  data() {
    return {
      suggestion: 0,
      myDataVariable: false,
      configurations: []
    };
  },
  methods: {
    checkData() {
      return {
        ...this.boardUnderUpdate,
        configurations: this.configurations
      };
    }
  },
  watch: {
    resources: {
      immediate: true,
      handler(val) {
        if (!val) return;
        if (
          this.boardUnderUpdate &&
          this.boardUnderUpdate.configurations &&
          this.boardUnderUpdate.configurations.length
        )
          return (this.configurations = this.boardUnderUpdate.configurations);
        this.configurations = val.boards_configurations.reduce((a, b) => {
          a.push({
            regulation_configuration_id: b.id,
            name: b.name.split("%s"),
            status: 0,
            value1: 0,
            value2: 0
          });
          return a;
        }, []);
      }
    }
  },
  computed: {
    boardUnderUpdate() {
      return this.$store.getters.boardUnderUpdate;
    },
    resources() {
      return this.$store.getters.resources;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep {
  .tabs {
    .card-body {
      padding: 0;
    }
    .card-header {
      background: none;
      display: flex;
      justify-content: center;
      border-bottom: none;

      ul {
        border: 1px solid #ddd;
        border-radius: 50px;
        li {
          a {
            border-radius: 50px;
            padding: 5px 20px;
          }
        }
      }
    }
  }
}
input {
  width: 50px;
}
.checks {
  width: 240px;
}
</style>