import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import tips from './components/Tips/index'
import './assets/styles/base/normalize.scss'
import './assets/js/iconfont'

Vue.prototype.$ajax= axios
Vue.config.productionTip = false
Vue.use(tips);

new Vue({
    store,
    router,
  render: h => h(App)
}).$mount('#app')
