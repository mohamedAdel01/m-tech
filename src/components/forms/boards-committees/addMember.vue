<template>
  <b-form @submit.prevent>
    <div class="d-flex align-items-center justify-content-center my-3" v-if="loading">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
    </div>
    <div class="d-flex flex-wrap" v-if="!loading">
      <div class="form-group col-md-6 col-12 px-2">
        <span class="d-inline-block font-13">{{ $t('Member name') }}</span>
        <v-select
          id="vselect"
          v-model="$v.form.member.$model"
          :get-option-label="option => option.translation.name"
          :options="resources.users.filter(user => !selectedUsers.includes(user.id))"
        />
        <div
          :class="{'invalid-feedback':true ,'d-block':$v.form.member.$error && !$v.form.member.required}"
        >{{$t('This field is required')}}</div>
      </div>
      <div class="form-group col-md-6 col-12 px-2">
        <span class="d-inline-block font-13">{{ $t('Position') }}</span>
        <v-select
          id="vselect"
          v-model="$v.form.position.$model"
          label="name"
          :options="resources.positions.filter(position => !selectedPositions.includes(position.id))"
        />
        <div
          :class="{'invalid-feedback':true ,'d-block':$v.form.position.$error && !$v.form.position.required}"
        >{{$t('This field is required')}}</div>
      </div>
      <div class="form-group col-md-6 col-12 px-2">
        <span class="d-inline-block font-13">{{ $t('Membership') }}</span>
        <v-select
          id="vselect"
          v-model="$v.form.membership.$model"
          label="name"
          :options="resources.memberships"
        />
        <div
          :class="{'invalid-feedback':true ,'d-block':$v.form.membership.$error && !$v.form.membership.required}"
        >{{$t('This field is required')}}</div>
      </div>
      
      <div class="form-group col-md-6 col-12 px-2">
        <span class="d-inline-block font-13">{{ $t('Membership') }}</span>
        <div class="date position-relative">
          <span class="position-absolute ico"></span>
          <datetime ref="date" v-model="form.joinDate"></datetime>
        </div>
      </div>

      <div class="w-100 mb-4">
        <b-form-checkbox
          class="mb-2"
          id="checkbox-1"
          v-model="status"
          name="checkbox-1"
        >{{$t('Add secondary roles')}}</b-form-checkbox>
        <div
          :class="['d-flex flex-wrap align-items-end', status? 'justify-content-between' : 'justify-content-end']"
        >
          <div v-show="status" class="form-group col-6 px-2 mb-0">
            <span class="d-inline-block font-13">{{ $t('Position') }}</span>
            <v-select id="vselect" :label="`name_${$i18n.locale}`" :options="secondaryRoles.filter(sr => sr.selected == false)" v-model="secondaryRoleModel" @input="toggleSecondaryPosition()" />
          </div>
        </div>
      </div>
     
      <div class="w-100 mb-4">
        <div class="text-right">
          <button class="btn btn-primary rounded-pill px-5" @click="addMember">{{$t('Add')}}</button>
        </div>
      </div>
    </div>
  </b-form>
</template>

<script>
import { addMemberValidation } from "@/constants/validation.js";
import { validationMixin } from "vuelidate";
import { Datetime } from "vue-datetime";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import "vue-datetime/dist/vue-datetime.css";
export default {
  props: ["members","managing_director_id","secretary_id","amanuensis_id"],
  mixins: [validationMixin],
  components: {
    vSelect,
    Datetime
  },
  data() {
    return {
      status: false,
      selectedUsers: [],
      selectedPositions: [],
      secondaryRoles: [
        {id:1,name_ar:"أمين المجلس",name_en: "Board Secretary",selected:false},
        {id:2,name_ar:"سكرتير المجلس",name_en: "Sub Secretary",selected:false},
        {id:3,name_ar:"العضو المنتدب",name_en: "Managing Director",selected:false}
      ],
      secondaryRoleModel:null,
      form: {
        member: null,
        position: null,
        membership: null,
        joinDate:null,
        is_amanuensis: false,
        is_secretary: false,
        is_manager_directory: false
      }
    };
  },
  methods: {
    toggleSecondaryPosition(){
      
      this.form.is_amanuensis = false
      this.form.is_secretary = false
      this.form.is_manager_directory = false

      switch(this.secondaryRoleModel.id){
        case 1:
          this.form.is_amanuensis = true
          break
        case 2:
          this.form.is_secretary = true
          break
        case 3:
          this.form.is_manager_directory = true
          break
      }
    },
    checkSecondaryRole(){
      if(!this.secondaryRoleModel) return true
      switch(this.secondaryRoleModel.id){
        case 1:
          this.$emit("handleSecondaryRole", {action:"setAmanuensis",member_id:this.form.member.id});
          break
        case 2:
          this.$emit("handleSecondaryRole", {action:"setSecretary",member_id:this.form.member.id});
          break
        case 3:
          if(this.form.position.id !== 1)
            this.$emit("handleSecondaryRole", {action:"setManagerDirectory",member_id:this.form.member.id});
          else
            //handle here conflict
            console.log('error member is already board directory')
          break
      } 
    },
    addMember() {
      this.$v.$touch();
      if (this.$v.$invalid) return false;
      this.$emit("addMember", Object.assign({}, this.form));
      this.checkSecondaryRole()
      Object.keys(this.form).forEach(k => (this.form[k] = null));
      this.secondaryRoleModel = null
      this.$v.$reset();
    },
    filterSecondaryForm(){
      this.secondaryRoles = [
        {id:1,name_ar:"أمين المجلس",name_en: "Board Secretary",selected:false},
        {id:2,name_ar:"سكرتير المجلس",name_en: "Sub Secretary",selected:false},
        {id:3,name_ar:"العضو المنتدب",name_en: "Managing Director",selected:false}
      ];

      this.members.map(m => {
        if(m.is_amanuensis == true){
          this.secondaryRoles.map(sr => {
            if(sr.id == 1)
              sr.selected = true
            return sr
          })
        }
        if(m.is_secretary == true){
          this.secondaryRoles.map(sr => {
            if(sr.id == 2)
              sr.selected = true
            return sr
          })
        }
        if(m.is_manager_directory == true){
          this.secondaryRoles.map(sr => {
            if(sr.id == 3)
              sr.selected = true
            return sr
          })
        }
      })
    }
  },

  watch: {
    members: {
      immediate: true,
      handler(val) {
        this.filterSecondaryForm()
        if (!val && !val.length) return;
        this.selectedUsers = [];
        this.selectedPositions = [];
        val.map(item => {
          this.selectedUsers.push(item.member.id);
          if ([5, 6].includes(item.position.id)) return item;
          this.selectedPositions.push(item.position.id);
        });
      }
    },
    secretary_id: {
      immediate: true,
      handler(val) {
        if(val !== 0)
          this.secondaryRoles[1].selected = true
        else
          this.secondaryRoles[1].selected = false
      }
    },
    amanuensis_id: {
      immediate: true,
      handler(val) {
        if(val !== 0)
          this.secondaryRoles[0].selected = true
        else
          this.secondaryRoles[0].selected = false
      }
    }
  },
  computed: {
    resources() {
      return this.$store.getters.resources;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  validations: addMemberValidation
};
</script>


<style lang="scss">
.info-form {
  .date {
    .ico {
      bottom: 0;
      background: #eee;
      height: 100%;
      width: 2.5rem;
      border: 1px solid #ced4da;
      border-radius: 0.25rem 0 0 0.25rem;
    }
  }
}
</style>