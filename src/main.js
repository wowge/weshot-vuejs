// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.filter('date', function (date) {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  return year.toString() + '年' + month.toString() + '月' + day.toString() + '日'
})

Vue.use(require('vue-wechat-title'))

/* eslint-disable no-new */
export const app = new Vue({
  el: 'app',
  router,
  components: { App },
  watch: {
    '$route': 'route'
  },
  created () {
    this.route()
  },
  methods: {
    isLoggedIn () {
      let token = window.localStorage['weshot-token']
      if (token) {
        let payload = JSON.parse(window.atob(token.split('.')[1]))
        return Date.now() / 1000 < payload.exp
      } else {
        return false
      }
    },
    route () {
      if (!this.isLoggedIn() && this.$route.path !== '/album') {
        this.$router.push('/login')
      } else if (this.isLoggedIn() && this.$route.path !== '/album') {
        this.$router.push('/albumsList')
      } else {
        // console.log(this.$route)
        this.$router.push(this.$route.fullPath)
      }
    }
  }
})
