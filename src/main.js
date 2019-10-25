import Vue from 'vue';
import VueTheMask from 'vue-the-mask';
import App from './js/App.vue';

Vue.use(VueTheMask);

new Vue({
  el: '#app',
  render: (h) => h(App)
});
