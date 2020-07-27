<template>
  <b-modal id="abroad-members-modal" hide-footer v-if="resources">
    <template v-slot:modal-header="{ close }">
      <h5 class="mb-0"> {{$t('An invitation to attend from abroad')}}</h5>
      <img class="pointer" src="@/assets/images/icons/close-circle.svg" @click="close()" />
    </template>

    <div :class="$i18n.locale == 'en' ? '' : 'rtl'">
      <div class="modal-body p-1">
        <div>
          <div class="mb-4">
            <b-form-group>
              <div class="d-flex">
                <b-form-radio
                  @change="toggleAddNewGuest($event)"
                  name="addNewGuest"
                  :value="false"
                  v-model="addNewGuest"
                >{{$t('Add a guest already registered')}}</b-form-radio>
                <b-form-radio
                  class="mx-4"
                  name="addNewGuest"
                  @change="toggleAddNewGuest($event)"
                  :value="true"
                  v-model="addNewGuest"
                >{{$t('Add a new guest')}}</b-form-radio>
              </div>
            </b-form-group>
          </div>

          <div v-if="!addNewGuest" class="form-group w-100 mb-4">
            <span class="d-inline-block font-13">{{ $t('Choose member') }}</span>
            <div class="search position-relative">
              <v-select  id="vselect" item-value="id" label="name" multiple :placeholder="$t('Choose member')"
              v-model="form.aboardMembers" :options="resources.users.filter(u => ! attendeesIds.includes(u.id))"  />
              <span class="position-absolute ico"></span>
            </div>
          </div>

          <div v-if="addNewGuest">
            <h5>{{$t('Member info')}}</h5>
            <add-member-form ref="addMemberForm" />
          </div>
        </div>

        <div>
          <h5>{{$t('Agenda entrusted with review')}}</h5>
          <div>
            <b-form-checkbox
              v-for="(agenda,index) in agendas" :key="index"
              v-model="status"
              name="checkbox-1"
              value="agenda.id"
              @change="toggleCanViewAgenda($event,agenda)"
              unchecked-value="not_accepted"
            >{{agenda.title}}</b-form-checkbox>
          </div>
        </div>
      </div>
      <div class="actions text-right">
        <button class="btn btn-outline-danger rounded-pill mx-2">{{$t('Cancel')}}</button>
        <button class="btn btn-primary rounded-pill px-4" @click="updateAttendees">{{$t('Send invitation')}}</button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import addMemberForm from "@/components/forms/meetings/addMember";
import { Datetime } from "vue-datetime";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import "vue-datetime/dist/vue-datetime.css";
import mixins from '@/mixins'
export default {
  mixins: [mixins],
  components: {
    addMemberForm,
    Datetime,
    vSelect
  },
  props:['agendas','attendees'],
  data() {
    return {
      status: null,
      attendeesIds: [],
      addNewGuest: false,
      agendasCanView:[],
      form: {
        aboardMembers: []
      }
    };
  },
  computed: {
    resources() {
      return this.$store.getters.resources
    },
    loading() {
      return this.$store.getters.loading
    }
  },
  watch:{
    attendees: {
      immediate: true,
      handler(val) {
        if(val && val.length > 0){
            let membersIds = []
            this.attendeesIds = val.map(a => a.member_id)
        }
      }
    }
  },
  methods: {
    toggleAddNewGuest(e){
      if(e == true)
        this.addNewGuest = true
      else
        this.addNewGuest = false
    },
    formatUserToAttendee(user){
        let userObject = {}
         userObject.member_id = user.id
        userObject.position_id = 3
        userObject.user = {translation:{title:user.translation.title,name:user.translation.name}}
        userObject.position = {name:"test position"}
        userObject.membership = {name:"test membership"}
        if(this.agendasCanView.length > 0)
        userObject.can_acccess_list = this.agendasCanView.join(',')

        return userObject
    },
    addNewUser(form) {
      return this.handleRequest("USERS", "CREATE_USER", form).then(res => {
        let attendee = this.formatUserToAttendee(this.$store.getters.user)
        let formData = []
        formData.push(attendee)
        this.$emit('addAboardMembers',formData)
        this.resetForm()
        this.$toasted.success(this.$t(res));
      });
    },
    updateAttendees(){
      if(this.addNewGuest){
        let addMemberForm = this.$refs.addMemberForm.checkData();
        if(addMemberForm)
          this.addNewUser(addMemberForm)
      }else{
        let dataForm = this.form.aboardMembers.map(a => {
        let attendee = this.formatUserToAttendee(a)

        return attendee
      })
      this.$emit('addAboardMembers',dataForm)
      this.resetForm()
      this.$bvModal.hide('abroad-members-modal')
      }

    },
    resetForm(){
      this.$data.form = {
        organizers: [],
        expireDate: null
      }
    },
    toggleCanViewAgenda(e,agenda){
      if(e.value == true)
        this.agendasCanView.push(id)
      if(e.value == false){
        for( var i = 0; i < this.agendasCanView.length; i++){ if ( this.agendasCanView[i] === id) { this.agendasCanView.splice(i, 1); }}
      }

      this.form.aboardMembers.map(am => am.can_acccess_list = this.agendasCanView)
    }
  }
};
</script>

<style lang="scss">
#abroad-members-modal {
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