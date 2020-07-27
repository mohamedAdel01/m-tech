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
    <circle class="a" cx="29" cy="29" r="29" />
    <g transform="translate(16 16)">
      <line class="b" x1="19.749" transform="translate(5.611 2.989)" />
      <circle class="b" cx="3" cy="3" r="3" />
      <g transform="translate(0.126 20.835)">
        <line class="b" x2="19.749" transform="translate(0 2.693)" />
        <circle class="b" cx="2.693" cy="2.693" r="2.693" transform="translate(19.847)" />
      </g>
      <g transform="translate(0.144 13.303)">
        <line class="b" x1="9.914" />
        <line class="b" x1="9.411" transform="translate(15.804)" />
      </g>
      <circle class="b" cx="2.693" cy="2.693" r="2.693" transform="translate(10.059 10.61)" />
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
  stroke-linejoin: round;
  stroke-width: 1.5px;
}
</style>