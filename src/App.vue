<template lang="pug">
  #app.container.common
    h1 {{ title }}
    .right(v-if="isLoggedIn()" @mouseover="showAlert()" @mouseout="clearAlert()") {{ user.nickName }}
      button(@click="logout()") 登出
        i.glyphicon.glyphicon-log-out
      .alert.alert-danger(v-if="alert") 在公用电脑上登录请记得登出，防止隐私泄漏
    .right(v-if="!isLoggedIn() && !isLoginPath()")
      button(@click="gotoLogin()") 登录
        i.glyphicon.glyphicon-log-in
    hr
    router-view(v-wechat-title="title")
</template>

<script>
  import LoginComp from './components/Login.vue'
  import AlbumsListComp from './components/AlbumsList.vue'
  import AlbumComp from './components/Album.vue'
  import store from './vuex/store'
  import {mapGetters} from 'vuex'

  export default {
    store,
    components: {
      LoginComp,
      AlbumsListComp,
      AlbumComp
    },
    data () {
      return {
        alert: false
      }
    },
    computed: mapGetters({
      title: 'getTitle',
      user: 'getUser'
    }),
    methods: {
      isLoginPath () {
        if (this.$route.path === '/login') {
          return true
        }
      },
      isLoggedIn () {
        let token = window.localStorage['weshot-token']
        if (token) {
          let payload = JSON.parse(window.atob(token.split('.')[1]))
          return Date.now() / 1000 < payload.exp
        } else {
          return false
        }
      },
      logout () {
        window.localStorage.removeItem('weshot-token')
        this.$router.push('/login')
      },
      showAlert () {
        this.alert = true
      },
      clearAlert () {
        this.alert = false
      },
      gotoLogin () {
        this.$router.push('/login')
      }
    }
  }
</script>

<style>
  .common {
    font-size: 26px;
  }
  .right {
    text-align: right;
  }
</style>
