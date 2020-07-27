<template>
  <section id="meeting-info" class="mb-5">
    <div class="d-flex justify-content-between align-items-center">
      <h5 class="mb-3 font-16">{{$t("Meeting Info")}}</h5>
      <button class="btn btn-link">{{$t('Update')}}</button>
    </div>
    <div class="bg-primary rounded p-3">
      <div>
        <p class="text-white">Adoption of the new executive regulations and implementation of them</p>
      </div>
      <div class="info d-flex align-items-stretch">
        <div class="col-4 px-1">
          <div class="pb-1 h-50">
            <div class="d-flex flex-wrap bg-white rounded h-100 px-2">
              <div class="w-75 d-flex justify-content-between align-items-center">
                <p class="mb-0">start meeting</p>
                <p class="mb-0">{{meeting.start_at.full}}</p>
              </div>
              <div class="w-75 d-flex justify-content-between align-items-center">
                <p class="mb-0">end meeting</p>
                <p class="mb-0">{{meeting.end_at.full}}</p>
              </div>
            </div>
          </div>
          <div class="pt-1 h-50">
            <div class="bg-white rounded d-flex align-items-center px-2 h-100">
              <p class="mb-0">meeting place</p>
              <p class="mb-0 px-3">{{meeting.location.name}}</p>
            </div>
          </div>
        </div>

        <div class="col-4 px-1">
          <div class="pb-1 h-50">
            <div
              class="bg-white rounded d-flex justify-content-between align-items-center px-2 h-100"
            >
              <p class="mb-0">meeting number</p>
              <p class="mb-0">{{meeting.number}}</p>
            </div>
          </div>
          <div class="pt-1 h-50">
            <div
              class="bg-white rounded d-flex justify-content-between align-items-center px-2 h-100"
            >
              <p class="mb-0">quorum</p>
              <p class="mb-0">{{meeting.quorum}}</p>
            </div>
          </div>
        </div>

        <div class="col-4 px-1">
          <div class="bg-white rounded p-2 h-100 overflow-auto">
            <p class="mb-0">Description of the meeting</p>
            <p class="mb-0">
              General description of the meeting status and recent decisions General
              description of the meeting status and recent decisions
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props:['meeting']
};
</script>

<style lang="scss">
#meeting-info {
  .info {
    height: 135px;
  }
}
</style>