<template>
  <ul class="p-0">
    <li
      class="d-flex align-items-center bg-secondary py-2 px-4 mb-2 rounded-pill"
    >
      <div class="col-4 px-0 py-1">{{$t('Name')}}</div>
      <div class="col-4 px-0 py-1 text-center">{{$t('Position')}}</div>
      <div class="col-4 px-0 py-1 text-right">{{$t('Membership')}}</div>
    </li>

    <li v-for="(attendee,index) in attendees" :key="index"
     class="d-flex align-items-center bg-white py-2 px-4 mb-2 rounded-pill">
      <div class="col-4 px-0 py-1" v-html="fullName(attendee)"></div>
      <div class="col-4 px-0 py-1 text-center" >{{attendee.position.name}}</div>
      <div class="col-4 px-0 py-1 text-right" >{{(attendee.membership)?attendee.membership.name:''}}</div>
    </li>
  </ul>
</template>

<script>
export default {
  props:['attendees'],
  methods: {
    fullName(user){
      if(user.user !== undefined)
        return user.user.translation.title +'/' + user.user.translation.name
      else
        return user.translation.title +'/' + user.translation.name
    }
  }
};
</script>

<style>
</style>