<template>
  <b-form id="agenda-powers" class="bg-white" @submit.prevent>
    <div class="border-bottom mb-4">
      <div class="mb-3">
        <div class="d-flex justify-content-between">
          <h5>{{$t('Board members')}}</h5>
        </div>
        <div>
          <b-form-radio
            name="some-radios"
            :value="true"
            checked="true"
            @change="toggleMembersCanView($event)"
          >{{$t('All members can view this Agenda')}}</b-form-radio>
          <b-form-radio
            name="some-radios"
            :value="false"
            @change="toggleMembersCanView($event)"
          >{{$t('Select specific members to view this agenda')}}</b-form-radio>
        </div>
      </div>

      <div v-if="!form.allMembersCanView">
        <div class="form-group w-100">
          <div class="search position-relative mb-2">
            <v-select  id="vselect" item-value="id" label="name" multiple :placeholder="$t('Choose member')"
            v-model="form.membersCanView" :options="resources.users" />
            <span class="position-absolute ico"></span>
          </div>

          <!-- <div class="d-flex flex-wrap">
            <div class="d-flex align-items-center bg-light rounded-pill py-1 px-1 m-1" v-for="member in form.membersCanView" :key="member.id">
              <p class="mb-0 px-3">{{member.name}}</p>
              <span class="px-2" @click="removeMember(member.id)">x</span>
            </div>
          </div> -->
        </div>
      </div>
    </div>

    <div>
      <div class="d-flex justify-content-between">
        <h5>{{$t('members from abroad')}}</h5>
      </div>
      <div class="form-group w-100">
        <div class="search position-relative mb-2">
          <v-select  id="vselect" item-value="id" label="name" multiple :placeholder="$t('Choose member')"
            v-model="form.aboardMembersCanView" :options="resources.users" />
          <span class="position-absolute ico"></span>
        </div>

        <!-- <div class="d-flex flex-wrap">
          <div class="d-flex align-items-center bg-light rounded-pill py-1 px-1 m-1">
            <p class="mb-0 px-3">Mohamed Adel</p>
            <span class="px-2">x</span>
          </div>
        </div> -->
      </div>
    </div>
  </b-form>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
export default {
  components: {
    vSelect
  },
  data() {
    return {
      options: [],
      form: {
        allMembersCanView: true,
        membersCanView: [],
        aboardMembersCanView: []
      }
    };
  },
  methods: {
    resetForm(){
      this.form = {
        allMembersCanView: true,
        membersCanView: [],
        aboardMembersCanView: []
      }
    },
    setData(){
      return this.$data.form
    },
    removeMember(id){
       this.form.membersCanView = this.form.membersCanView.filter(m =>  m.id !== id)
    },
    toggleMembersCanView(e) {
      if(e == true)
        this.form.allMembersCanView = true
      else
        this.form.allMembersCanView = false
    }
  },
  computed:{
    resources() {
      return this.$store.getters.resources
    }
  }
};
</script>

<style lang="scss">
#agenda-powers {
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
