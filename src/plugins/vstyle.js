import Vue from 'vue'

Vue.component('v-style', {
    render(createElement) {
        return createElement('style', this.$slots.default)
    }
});