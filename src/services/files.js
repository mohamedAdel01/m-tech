import Api from './api'

export default {
   UPLOAD_FILE(formData) {
      return Api().post('medias-upload',formData)
   }
}