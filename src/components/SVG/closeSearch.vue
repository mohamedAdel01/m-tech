<template>
  <svg
    @click="$emit('click')"
    class="settings"
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="50"
    viewBox="-3 0 70 58"
  >
    <defs />
    <g transform="translate(-114 -347)">
      <circle class="a" cx="29" cy="29" r="29" transform="translate(114 347)" />
      <g transform="translate(3.686 3.686)">
        <line class="b" x1="13" y2="13" transform="translate(133.314 366.314)" />
        <line class="b" x2="13" y2="13" transform="translate(133.314 366.314)" />
      </g>
    </g>
  </svg>
</template>
<style>
.settings .a {
  fill: var(--primary-color);
}
.settings .b {
  fill: none;
  stroke: #fff;
  stroke-linecap: round;
  stroke-width: 2px;
}
</style>