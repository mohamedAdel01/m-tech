<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="mb-0">{{$t('Board members')}}</h5>
      <button
        class="btn btn-link rounded-pill px-4"
        @click="$bvModal.show('add-edit-user-modal')"
      >{{$t('Add new user')}}</button>
    </div>
    <div class="bg-light p-3 rounded mb-3">
      <div class="bg-white rounded p-3">
        <add-member-form
          :managing_director_id="managing_director_id"
          :secretary_id="secretary_id"
          :amanuensis_id="amanuensis_id"
          :members="members"
          @addMember="members.push($event)"
          @handleSecondaryRole="handleSecondaryRole($event)"
        />
        <add-members-table :members="members" @removeMember="removeMember($event)" />
      </div>
    </div>
    <div class="bg-light p-3 rounded mb-3">
      <h6 class="mb-3">{{$t('Assign a managing director from outside the Board')}}</h6>
      <add-single-member
        @selectMember="amanuensis_id=$event"
        :otherOne="secretary_id"
        :selected="amanuensis_id"
        @deleteSelected="amanuensis_id = 0"
      />
    </div>

    <div class="bg-light p-3 rounded mb-3">
      <h6 class="mb-3">{{$t('Assign a secretary to the Board')}}</h6>
      <add-single-member
        @selectMember="secretary_id=$event"
        :selected="secretary_id"
        :otherOne="amanuensis_id"
        @deleteSelected="secretary_id = 0"
      />
    </div>

    <section class="actions text-right">
      <button class="btn btn-outline-danger rounded-pill px-3">{{$t('Cancel')}}</button>
      <button class="btn btn-secondary rounded-pill mx-3 px-4">{{$t('Previous')}}</button>
      <button class="btn btn-primary rounded-pill px-5" @click="next">{{$t('Next')}}</button>
    </section>

    <add-edit-user-modal />
  </div>
</template>

<script>
import mixins from "@/mixins";
import addMemberForm from "@/components/forms/boards-committees/addMember.vue";
import addSingleMember from "@/components/forms/boards-committees/addSingleMember.vue";
import addMembersTable from "@/components/tables/boards-committees/addMembers.vue";
import addEditUserModal from "@/components/modals/users/addEditUser.vue";

export default {
  mixins: [mixins],
  components: {
    addMemberForm,
    addSingleMember,
    addMembersTable,
    addEditUserModal
  },
  data() {
    return {
      members: [],
      managing_director_id: 0,
      secretary_id: 0,
      amanuensis_id: 0
    };
  },
  computed: {
    resources() {
      return this.$store.getters.resources;
    },
    boardUnderUpdate() {
      return this.$store.getters.boardUnderUpdate;
    }
  },
  watch: {
    resources: {
      immediate: true,
      handler(val) {
        if (!val) return;
        if (this.boardUnderUpdate) {
          this.managing_director_id = this.boardUnderUpdate.managing_director_id;
          this.secretary_id = this.boardUnderUpdate.secretary_id;
          this.members = this.boardUnderUpdate.members.map(item => {
            return {
              member: val.users.filter(user => user.id == item.member_id)[0],
              position: val.positions.filter(
                position => position.id == item.position_id
              )[0],
              membership: val.memberships.filter(
                membership => membership.id == item.membership_id
              )[0]
            };
          });
        }
      }
    }
  },
  methods: {
    next() {
      let members = this.members.reduce((a, b) => {
        a.push({
          member_id: b.member.id,
          position_id: b.position.id,
          membership_id: b.membership.id
        });
        return a;
      }, []);

      let board = {
        ...this.boardUnderUpdate,
        members: members,
        managing_director_id: this.managing_director_id,
        secretary_id: this.secretary_id,
        amanuensis_id: this.amanuensis_id
      };

      this.handleRequest("BOARDS_COMMITTEES", "UPDATE_BOARD", board).then(
        res => {
          if (res.warning) this.$toasted.show(res.Message);
          this.$router.push(
            "/boards-committees/secretary-board-create/0/powers"
          );
        }
      );
    },
    handleSecondaryRole(data) {
      switch (data.action) {
        case "setAmanuensis":
          this.amanuensis_id = data.member_id;
          break;
        case "setSecretary":
          this.secretary_id = data.member_id;
          break;
        case "setManagerDirectory":
          this.managing_director_id = data.member_id;
          break;
      }
    },
    removeMember(removedItem) {
      if (removedItem.is_amanuensis == true) {
        this.amanuensis_id = 0;
      }
      if (removedItem.is_secretary == true) {
        this.secretary_id = 0;
      }
      if (removedItem.is_manager_directory == true) {
        this.managing_director_id = 0;
      }
      this.members = this.members.filter(
        item => item.member.id != removedItem.member.id
      );
    }
  }
};
</script>
