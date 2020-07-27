<template>
  <svg
  class="sidebar"
    xmlns="http://www.w3.org/2000/svg"
    width="35.00"
    height="24.075"
    viewBox="0 0 24.075 24.075"
  >
    <defs />
    <g transform="translate(-3.75 -3.75)">
      <path
        class="a"
        d="M22.5,4.5h5.017a2.508,2.508,0,0,1,2.508,2.508V24.566a2.508,2.508,0,0,1-2.508,2.508H22.5"
        transform="translate(-2.95)"
      />
      <path class="a" d="M15,23.042l6.271-6.271L15,10.5" transform="translate(-1.721 -0.983)" />
      <path class="a" d="M19.55,18H4.5" transform="translate(0 -2.213)" />
    </g>
  </svg>
</template>
<style scoped>
.sidebar .a {
  fill: none;
  stroke: var(--side-icon-color);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2px;
}
.active .a {
  stroke: var(--side-icon-active-color);
}
</style>