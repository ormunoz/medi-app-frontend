import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import Popper from "vue3-popper";
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faUser, faEnvelope, faUserSecret } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import 'vue3-toastify/dist/index.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2';

const pinia = createPinia();
const app = createApp(App);
library.add(faUser, faEnvelope, faUserSecret, faTwitter, fas);
app.directive("click-outside", {
  mounted(el, binding) {
    el.clickOutsideEvent = function (event: Event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el);
      }
    };
    document.body.addEventListener("mousedown", el.clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener("mousedown", el.clickOutsideEvent);
  },
});

app.provide('$swal', Swal);
app.use(pinia);
app.use(router);
app.component("Popper", Popper);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount("#app");