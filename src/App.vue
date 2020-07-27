<template>
  <div id="app" :class="$i18n.locale == 'en' ? '' : 'rtl'">
    <theme />
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import theme from "./components/theme/variables";
export default {
  components: {
    theme
  },
  created() {
    const html = document.documentElement; // returns the html tag
    html.setAttribute("lang", this.$i18n.locale);
  }
};
</script>

<style lang="scss">
* {
  font-family: DroidArabicKufi;
}
.mx-input:hover,
.mx-input:focus {
  border-color: var(--primary-color) !important;
}
.mx-table-date .today {
  color: var(--primary-color) !important;
}
.mx-calendar-content .cell.active {
  background-color: var(--primary-color) !important;
}
.mx-datepicker {
  width: 100% !important;
  .mx-input {
    margin: 0;
    display: block;
    width: 100%;
    height: calc(1.5em + 0.85rem);
    padding: 0.375rem 4rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    overflow: hidden;
  }
}
.vs--single {
  .vs__selected {
    background: none !important;
    color: black !important;
  }
}
.vs__actions {
  display: none !important;
}
.vs__selected-options {
  display: flex !important;
  flex-wrap: nowrap !important;
  align-items: center;
}
.vs__selected {
  margin: 0 5px !important;
  font-size: 14px;
  padding: 15px 5px;
  height: 25px;
  background: var(--primary-color) !important;
  color: white !important;
  button {
    margin: 0 10px 0 0 !important;
    svg path {
      fill: white !important;
    }
  }
}

// all style here global and will be separate
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.line {
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    right: 100px;
    left: 100px;
    top: 50%;
    height: 1px;
    width: 50%;
    background: var(--secondary-color);
    z-index: 1;
  }
  div {
    z-index: 2;
  }
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
input:active,
input:focus {
  outline: none;
}
li {
  list-style: none;
}
.breadcrumb {
  background-color: transparent !important;
  margin-bottom: 0.5rem !important;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: "|" !important;
}

.invalid-feedback {
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  font-size: 0.76rem;
  color: #333 !important;
  background: white;
  border: 1px solid var(--primary-color);
  opacity: 0.8;
  text-align: center;
  width: unset !important;
  position: absolute;
  z-index: 4;
  margin-top: -0.5rem;
  left: 50%;
  transform: translateX(-50%);

  &::before {
    content: "";
    position: absolute;
    top: -5px;
    left: -2.5px;
    margin-left: 50%;
    width: 10px;
    height: 5px;
    border-bottom: solid 5px var(--primary-color);
    border-left: solid 5px transparent;
    border-right: solid 5px transparent;
  }

  &::after {
    content: "";
    position: absolute;
    top: -4px;
    left: -2.5px;
    margin-left: 50%;
    width: 10px;
    height: 5px;
    border-bottom: solid 5px white;
    border-left: solid 5px transparent;
    border-right: solid 5px transparent;
  }
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.pointer {
  cursor: pointer;
}

.font-13 {
  font-size: 13px;
}

.modal-header {
  h5 {
    margin: 0 !important;
  }
}

.vdatetime {
  width: 100%;
  .vdatetime-input {
    margin: 0;
    display: block;
    width: 100%;
    height: calc(1.5em + 0.85rem);
    padding: 0.375rem 4rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    overflow: hidden;
  }
}
.vs__dropdown-toggle {
  padding: 0 !important;
  border-radius: 0.25rem;
  border-color: #ced4da;
  input {
    margin: 0;
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
  }
}

.vue-js-switch {
  margin: 0;
}

.vue-tel-input {
  border-color: #ced4da !important;
  &:focus,
  &:active {
    border-color: !important;
  }
}

.vue-tel-input input {
  padding: 0.375rem 0.75rem;
}

.vue-tel-input:focus-within {
  outline: none !important;
  box-shadow: none !important;
}

.deg-180 {
  transform: rotate(180deg);
}
</style>
