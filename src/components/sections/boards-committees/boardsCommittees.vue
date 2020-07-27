<template>
  <section>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="mb-0">{{$t('Boards and Committees')}}</h5>
      <div>
        <router-link to="/" class="btn btn-primary rounded-pill mx-3 px-3">{{$t('Add committee')}}</router-link>
        <router-link
          to="/boards-committees/secretary-board-create/0"
          class="btn btn-primary rounded-pill px-3"
        >{{$t('Add board')}}</router-link>
      </div>
    </div>

    <div>
      <div v-for="(board, i) in boards" :key="'board' + i" class="bg-light rounded p-3 mb-4">
        <div class="d-flex align-items-center justify-content-center my-3" v-show="loading">
          <b-spinner variant="primary" label="Spinning"></b-spinner>
        </div>
        <div class="bg-primary rounded p-4 mb-4">
          <div class="d-flex justify-content-between mb-3">
            <h5
              class="pointer text-white"
              @click="$router.push('boards-committees/secretary-board-show/' + board.id)"
            >{{board.translation.name}}</h5>
            <div class="d-flex align-items-center justify-content-center my-3" v-if="loading">
              <b-spinner variant="primary" label="Spinning"></b-spinner>
            </div>
            <div v-if="!loading" class="d-flex align-items-center">
              <div
                class="mx-4"
                @click="$router.push('boards-committees/secretary-board-update/' + board.id)"
                v-b-tooltip.hover
                :title="$t('Update board')"
              >
                <img class="pointer" src="@/assets/images/icons/white-edit.svg" alt />
              </div>
              <div @click="removeBoard(board.id)" v-b-tooltip.hover :title="$t('Remove board')">
                <img class="pointer" src="@/assets/images/icons/white-bin.svg" alt />
              </div>
            </div>
          </div>
          <div class="d-flex font-14">
            <div class="d-flex bg-white rounded p-3">
              <p class="mb-0 text-black-50">{{$t('Duration')}}</p>
              <p
                class="mb-0 px-2"
              >{{board.start_at ? board.start_at.gregorian.date + ' - ' + board.end_at.gregorian.date : $t('Permenant board')}}</p>
              <!-- board.is_permanent -->
            </div>
            <div class="d-flex bg-white rounded p-3 mx-3">
              <p class="mb-0 text-black-50">{{$t('Members number')}}</p>
              <p class="mb-0 px-2">{{board.members.length}} {{$t('member')}}</p>
            </div>
            <div class="d-flex bg-white rounded p-3" v-if="board.has_sub > 0">
              <p class="mb-0 text-black-50">{{$t('Contain')}}</p>
              <p class="mb-0 px-2">{{board.has_sub}} {{$t('Committees')}}</p>
            </div>
          </div>
        </div>
        <div v-if="board.committees.length">
          <div class="mb-3">
            <h6>{{$t('Board committees')}}</h6>
          </div>
          <div>
            <div
              v-for="(committee, i) in board.committees"
              :key="i"
              class="bg-white rounded p-3 mb-2"
            >
              <div class="d-flex justify-content-between">
                <h5
                  @click="$router.push('boards-committees/committee-show/' + committee.id)"
                >{{committee.translation.name}}</h5>
                <div>📜🗑</div>
              </div>
              <div class="d-flex">
                <div class="d-flex py-1">
                  <p class="mb-0 text-black-50">{{$t('Duration')}}</p>
                  <p
                    class="mb-0 px-2"
                  >{{committee.start_at ? committee.start_at.gregorian.date + ' - ' + committee.end_at.gregorian.date : $t('Permenant committee')}}</p>
                </div>
                <div class="d-flex py-1 px-3 mx-3 border-right border-left">
                  <p class="mb-0 text-black-50">{{$t('Members number')}}</p>
                  <p class="mb-0 pl-2">missing {{$t('member')}}</p>
                </div>
                <div class="d-flex py-1">
                  <p class="mb-0 text-black-50">{{$t('Sub-committees')}}</p>
                  <p class="mb-0 px-2">missing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import mixins from "@/mixins";
export default {
  mixins: [mixins],
  computed: {
    boards() {
      return this.$store.getters.boards;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    removeBoard(id) {
      this.handleRequest("BOARDS_COMMITTEES", "REMOVE_BOARD", id);
    }
  }
};
</script>
