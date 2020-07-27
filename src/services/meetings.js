import Api from './api'

export default {
   SHOW_MEETINGS() {
      return Api().get('meetings')
   },
   SHOW_MEETING(meetingId) {
      return Api().get(`meetings/${meetingId}`)
   },
   CREATE_MEETING(reqPayload) {
      return Api().post('meetings', reqPayload)
   },
   SHOW_ACTIONS() {
      return Api().get('actions')
   },
   SHOW_TASKS() {
      return Api().get('tasks')
   },
   CREATE_MEETING_SUGGESSTION(reqPayload) {
      return Api().post('times', reqPayload)
   }
}