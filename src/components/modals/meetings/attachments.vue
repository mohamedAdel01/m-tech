<template>
  <b-modal id="attachments-modal" hide-footer>
    <template v-slot:modal-header="{ close }">
      <h5 class="mb-0"> {{$t('Add attachment')}}</h5>
      <img class="pointer" src="@/assets/images/icons/close-circle.svg" @click="close()" />
    </template>

    <div :class="$i18n.locale == 'en' ? '' : 'rtl'">
      <div class="modal-body p-1">
        <div class="mb-4">
          <b-form-group :label="$t('Attachment name')" class="mb-3 w-100">
            <b-form-input type="text" v-model="form.attachmentTitle" />
            <b-form-invalid-feedback>{{$t('This field is required')}}</b-form-invalid-feedback>
          </b-form-group>
          <div>
            <input type="file" class="d-none" ref="attachment" @change="uploadFile($event)" />
            <div
              class="d-flex justify-content-center align-items-center border rounded-lg py-2 pointer"
              @click="$refs.attachment.click()"
            >
              <div class="text-center">
                <span>◽</span>
                <p>{{$t('Choose file')}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="actions text-right">
        <button class="btn btn-outline-danger rounded-pill mx-2">{{$t('Cancel')}}</button>
        <button class="btn btn-primary rounded-pill px-4">{{$t('Add')}}</button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import mixins from '@/mixins'
export default {
  mixins: [mixins],
  data() {
    return {
      options: [],
      form: {
        attachmentTitle: null
      }
    };
  },
  methods: {
    uploadFile(e){
      if(e.target.files){
        const data = new FormData();
        data.append('file', e.target.files[0])
        data.append('title',this.form.attachmentTitle)
        this.handleRequest('FILES','UPLOAD_FILE',data).then(res => {
          this.form.attachmentTitle = null
          this.$emit("attachmentUploaded", res);
          this.$bvModal.hide('attachments-modal')
        })
      }
    }
  }
};
</script>

<style lang="scss">
#attachments-modal {
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