<template lang="pug">
  .container
    form#login.form-horizontal
      .form-group
        label.col-xs-12.col-sm-2.control-label(for='nickName') 用户名
        .col-xs-12.col-sm-10
          input#nickName.form-control(name='nickName' type='text' v-model='credential.nickName')
      .form-group
        label.col-xs-12.col-sm-2.control-label(for='password') 密码
        .col-xs-12.col-sm-10
          input#password.form-control(name='password' type='password' v-model='credential.password')
    button#confirm.btn.btn-default.pull-right(@click="login(credential)") 确定
    .well(v-show="loginErr!==''")
      span {{ loginErr }}
    br
    br
    .panel.panel-default
      .panel-heading
        .panel-title 小程序
      .panel-body 微信扫描二维码可打开"似水流年小相册"小程序版，查看首页说明获取用户名、密码
      img.img-responsive(:src="qrcode")
</template>


<style scoped>
</style>


<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    methods: mapActions(['login']),
    computed: mapGetters({
      loginErr: 'getLoginErr'
    }),
    data () {
      return {
        qrcode: 'http://image-public.wowge.org/weshot_code_20170709.jpg',
        credential: {
          nickName: '',
          password: ''
        }
      }
    }
  }
</script>
