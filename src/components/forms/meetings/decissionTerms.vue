<template>
  <b-form id="decission-powers" class="bg-white" @submit.prevent>
    <div class="mb-3">
      <div
        class="bg-light rounded py-3 px-2 d-flex justify-content-between align-items-center mb-2"
      >
        <p class="mb-0">option 1</p>
        <toggle-button
          :width="45"
          :height="25"
          color="var(--primary-color)"
          v-model="myDataVariable"
        />
      </div>
      <div
        class="d-flex justify-content-between align-items-center bg-light rounded py-2 px-2 mb-2"
      >
        <div>
          <span>{{$t('option 2')}}</span>
          <span>
            <input
              type="number"
              onkeyup="if(this.value>100){this.value='100';}else if(this.value<0){this.value='0';}"
              class="rounded border mx-2 py-2 text-center font-weight-bold"
            />
          </span>
          <span>%</span>
        </div>
        <toggle-button
          :width="45"
          :height="25"
          color="var(--primary-color)"
          v-model="myDataVariable"
        />
      </div>
    </div>
    <div class="mb-3 border-bottom py-3">
      <h6>{{$t('Voting optoins')}}</h6>
      <div>
        <b-form-checkbox
          class="mb-2"
          id="checkbox-1"
          v-model="status"
          name="checkbox-1"
        >{{$t('Agree')}}</b-form-checkbox>
        <b-form-checkbox
          class="mb-2"
          id="checkbox-1"
          v-model="status"
          name="checkbox-1"
        >{{$t('Disagree')}}</b-form-checkbox>
        <b-form-checkbox
          class="mb-2"
          id="checkbox-1"
          v-model="status"
          name="checkbox-1"
        >{{$t('Refrain')}}</b-form-checkbox>
        <b-form-checkbox
          class="mb-2"
          id="checkbox-1"
          v-model="status"
          name="checkbox-1"
        >{{$t('Request meeting')}}</b-form-checkbox>
        <div>
          <span>{{$t('In case of request meeting from')}}</span>
          <span>
            <input
              type="number"
              onkeyup="if(this.value>100){this.value='100';}else if(this.value<0){this.value='0';}"
              class="rounded border mx-2 py-2 text-center font-weight-bold"
            />
          </span>
          <span>{{$t('members will end voting')}}</span>
        </div>
      </div>
    </div>
  </b-form>
</template>

<script>
import { ToggleButton } from "vue-js-toggle-button";

export default {
  components: {
    ToggleButton
  },
  data() {
    return {};
  },
  methods: {
    removeMember(id) {
      this.form.membersCanView = this.form.membersCanView.filter(
        m => m.id !== id
      );
    },
    toggleMembersCanView(e) {
      if (e == true) this.form.allMembersCanView = true;
      else this.form.allMembersCanView = false;
    }
  },
  computed: {
    users() {
      return this.$store.getters.resources.users
    },
    aboardMembers() {
      return this.$store.getters.resources.users
    }
  }
};
</script>

<style lang="scss">
#decission-powers {
  input {
    width: 50px;
    padding: 7px 0;
  }
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
}
</style>
