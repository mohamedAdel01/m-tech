<template>
  <b-modal id="organizers-modal" ref="organizersModal" hide-footer v-if="resources">
    <template v-slot:modal-header="{ close }">
      <h5 class="mb-0 d-flex align-items-center">
        <organizer-icon />
        <span class="mx-2">{{$t('Add organizers')}}</span>
      </h5>
      <img class="pointer" src="@/assets/images/icons/close-circle.svg" @click="close()" />
    </template>
    <div :class="$i18n.locale == 'en' ? '' : 'rtl'">
      <div class="modal-body p-1">
        <div v-if="!form.organizer" class="form-group w-100 px-2 mb-5">
          <span class="d-inline-block label">{{ $t('Choose member') }}</span>
          <div class="search position-relative">
            <v-select
              multiple
              id="vselect"
              label="name"
              v-model="form.organizers"
              v-if="resources.users"
              :options="filteredUsers.map(u => {
                u.name = u.translation.name
                return u
              })"
              @input="setCapabilitiesToOrganizers"
            />
            <span class="position-absolute ico"></span>
          </div>
        </div>

        <div v-if="form.organizer">
          <p>{{form.organizer.name}}</p>
        </div>

        <div>
          <p class="font-16">{{$t('Determine member permissions')}}</p>
        </div>

        <div class="mb-4">
          <b-form-group>
            <div class="d-flex label">
              <b-form-radio
                v-model="chooseAllCapabilities"
                name="some-radios"
                :value="true"
              >{{$t('Choose all')}}</b-form-radio>
              <b-form-radio
                v-model="chooseAllCapabilities"
                class="mx-4"
                name="some-radios"
                :value="false"
              >{{$t('Choose custom')}}</b-form-radio>
            </div>
          </b-form-group>
        </div>

        <div v-if="resources.capabilities" class="bg-light rounded mb-4">
          <div
            v-for="(capability,index) in resources.capabilities"
            :key="capability.id"
            :class="['d-flex justify-content-between align-items-center p-3', index < resources.capabilities.length - 1 ? 'border-bottom' : '']"
          >
            <div>
              <p class="mb-0 text-black-50 font-14">{{capability.name}}</p>
            </div>
            <div>
              <toggle-button
                :width="45"
                :height="25"
                color="var(--primary-color)"
                :sync="true"
                :value="enabledCapabilities.includes(capability.id)"
                @change="toggleCapability($event,capability.id)"
              />
            </div>
          </div>
        </div>

        <div>
          <b-form-group
            :label="$t('The date on which these powers expire')"
            class="mb-4 w-100 px-2"
          >
            <div class="search position-relative">
              <span class="position-absolute ico"></span>
              <datetime ref="date" v-model="form.expireDate" type="datetime"></datetime>
            </div>

            <b-form-invalid-feedback>{{$t('This field is required')}}</b-form-invalid-feedback>
          </b-form-group>
        </div>
      </div>
      <div class="actions text-right">
        <button class="btn btn-link text-danger rounded-pill mx-2 px-4">{{$t('Cancel')}}</button>
        <button class="btn btn-primary rounded-pill px-4" @click="updateOrganizers">{{$t('Add')}}</button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import organizerIcon from "@/components/SVG/organizer";
import { Bus } from "@/main";
import { ToggleButton } from "vue-js-toggle-button";
import { Datetime } from "vue-datetime";
import vSelect from "vue-select";
// import "vue-select/dist/vue-select.css";
import "vue-datetime/dist/vue-datetime.css";
export default {
  props: ["organizers"],
  components: {
    ToggleButton,
    Datetime,
    vSelect,
    organizerIcon
  },
  data() {
    return {
      options: [],
      enabledCapabilities: [],
      filteredUsers: [],
      disableCapabilities: false,
      chooseAllCapabilities: false,
      form: {
        editMode: false,
        organizers: [],
        expireDate: null,
        organizer: null
      }
    };
  },
  watch: {
    chooseAllCapabilities(val) {
      if (!val) return;
      this.enabledCapabilities = this.resources.capabilities.reduce((a, b) => {
        a.push(b.id);
        return a;
      }, []);
      this.form.organizers.map(
        o => (o.capabilities = this.enabledCapabilities)
      );
    },
    resources: {
      immediate: true,
      handler(val) {
        let organizers = [];
        if (this.organizers && this.organizers.length) {
          organizers = this.organizers.reduce((a, b) => {
            a.push(b.id);
            return a;
          }, []);
        }
        this.filteredUsers = val.users.filter(
          user => !organizers.includes(user.id)
        );
      }
    }
  },
  methods: {
    resetData() {
      Object.assign(this.$data, this.$options.data.apply(this));
      let organizers = [];
      if (this.organizers && this.organizers.length) {
        organizers = this.organizers.reduce((a, b) => {
          a.push(b.id);
          return a;
        }, []);
      }
      this.filteredUsers = this.resources.users.filter(
        user => !organizers.includes(user.id)
      );
    },
    setCapabilitiesToOrganizers() {
      this.form.organizers.map(
        o => (o.capabilities = this.enabledCapabilities)
      );
    },
    setOrganizer(id) {
      this.form.organizer = this.resources.users.filter(o => o.id == id)[0];
      // console.log()
      this.form.organizers = this.organizers;
      this.enabledCapabilities = this.form.organizer.capabilities
    },
    updateOrganizers() {
      this.$emit("setOrganizers", this.$data.form);
      this.form.editMode = false;
      this.$bvModal.hide("organizers-modal");
      this.$refs.organizersModal.$forceUpdate();

      if (this.form.organizers.length > 0) this.disableCapabilitiesForBulk;
      else this.disableCapabilitiesForBulk;
    },
    toggleCapability(e, id) {
      if (!this.form.editMode) {
        if (e.value == true) this.enabledCapabilities.push(id);
        if (e.value == false) {
          for (var i = 0; i < this.enabledCapabilities.length; i++) {
            if (this.enabledCapabilities[i] === id) {
              this.enabledCapabilities.splice(i, 1);
            }
          }
        }
        this.form.organizers.map(
          o => (o.capabilities = this.enabledCapabilities)
        );
      } else {
        if (e.value == true) {
          // this.form.organizer.capabilities.push(id);
          this.enabledCapabilities.push(id);
        } else {
          this.form.organizer.capabilities = this.form.organizer.capabilities.filter(c => c != id)
          this.enabledCapabilities = this.enabledCapabilities.filter(c => c != id)
        }
        this.form.organizers.map(o => {
          if (o.id == this.form.organizer.id) {
            o = this.form.organizer;
          }
        });
      }
    },
    capabilityIsEnabled(id) {
      if (this.form.editMode)
        return this.form.organizer.capabilities.filter(c => c == id).length > 0
          ? true
          : false;
      else
        return this.enabledCapabilities.filter(c => c == id).length > 0
          ? true
          : false;
    }
  },
  computed: {
    resources() {
      return this.$store.getters.resources;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style lang="scss">
#organizers-modal {
  .vs__actions {
    padding: 4px 50px 0 0;
  }
  .search {
    .ico {
      bottom: 0;
      right: 0;
      background: #eee;
      height: 100%;
      width: 2.5rem;
      border: 1px solid #ced4da;
      border-radius: 0 0.25rem 0.25rem 0;
    }
  }
  .vue-js-switch {
    margin: 0;
  }
  .hide {
    visibility: hidden !important;
  }
}
</style>