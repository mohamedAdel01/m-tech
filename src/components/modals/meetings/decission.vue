<template>
  <b-modal id="decission-modal" hide-footer>
    <template v-slot:modal-header="{ close }">
      <h5 class="mb-0"> {{$t('Add decission')}}</h5>
      <img class="pointer" src="@/assets/images/icons/close-circle.svg" @click="close()" />
    </template>

    <div :class="$i18n.locale == 'en' ? '' : 'rtl'">
      <div class="modal-body">
            <div>
              <decision-form :agendas="agendas" ref="decisionForm" />
            </div>
      </div>
      <div class="actions text-right">
        <button class="btn btn-outline-danger rounded-pill mx-2">{{$t('Cancel')}}</button>
        <button class="btn btn-primary rounded-pill px-4" @click="getDecisionFormsData">{{$t('Add')}}</button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import decisionForm from "@/components/forms/meetings/decisionForm";
import { Datetime } from "vue-datetime";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import "vue-datetime/dist/vue-datetime.css";
export default {
  components: {
    decisionForm,
    Datetime,
    vSelect
  },
  props: ['agendas'],
  data() {
    return {
      options: []
    };
  },
  methods: {
    getDecisionFormsData() {
        let decisionForm = this.$refs.decisionForm.setData()
        this.$emit('addAction',decisionForm)
        this.$refs.decisionForm.resetForm()
        this.$bvModal.hide('decission-modal')
    }
  }
};
</script>

<style lang="scss">
#decission-modal {
  .tabs {
    .card-body {
      padding: 0;
    }
    .card-header {
      background: none;
      display: flex;
      justify-content: center;
      border-bottom: none;
      margin-bottom: 15px;

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
}
</style>