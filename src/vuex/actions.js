import {SET_LOGINERR, UPDATE_USERINFO, UPDATE_ALBUMSLIST, UPDATE_ALBUM, UPDATE_TITLE} from './mutations_type'
import Vue from 'vue'
import VueResource from 'vue-resource'
import {app} from '../main'

Vue.use(VueResource)

export default {
  login (store, credential) {
    if (credential.nickName === '' || credential.password === '') {
      store.commit(SET_LOGINERR, '不允许为空')
      return
    }
    Vue.http.post(store.state.domain + '/vue/login', {nickName: credential.nickName, password: credential.password})
      .then(res => {
        return res.json()
      })
      .then(res => {
        window.localStorage['weshot-token'] = res.token
        app.$router.push('/albumsList')
      })
      .catch(err => {
        if (err.body.msg === 'incorrect user') {
          store.commit(SET_LOGINERR, '用户名错误')
        } else if (err.body.msg === 'incorrect password') {
          store.commit(SET_LOGINERR, '密码错误')
        }
      })
  },
  getAlbumsList (store, that) {
    let token = window.localStorage['weshot-token']
    let payload = JSON.parse(window.atob(token.split('.')[1]))
    let uid = payload._id
    let user = {}
    let albumsList = []
    // {headers: {Authorization: 'Bearer ' + token}}
    Vue.http.get(store.state.domain + '/vue/user' + '?id=' + uid)
      .then(res => {
        return res.json()
      })
      .then(res => {
        store.commit(UPDATE_USERINFO, res)
        user = res
        store.commit(UPDATE_TITLE, user.nickName + '的相册')
        let flag = 0
        let run = 0
        for (let i = 0; i < user.history.length; i++) {
          Vue.http.get(store.state.domain + '/vue/album' + '?id=' + user.history[i])
            .then(res => {
              run++
              albumsList[i] = {
                id: user.history[i],
                cover: res.data.photos[0],
                title: res.data.albumName,
                author: res.data.userInfo.open_id,
                createOn: new Date(res.data.createOn)
              }
              return Vue.http.get(store.state.domain + '/api/downloadUrl' + '?key=' + albumsList[i].cover)
            })
            .then(res => {
              albumsList[i].cover = res.data.downloadUrl
              return Vue.http.get(store.state.domain + '/vue/user' + '?id=' + albumsList[i].author)
            })
            .then(res => {
              albumsList[i].author = {
                nickName: res.data.nickName,
                avatar: res.data.avatarUrl
              }
              flag++
              if (flag === run) {
                store.commit(UPDATE_ALBUMSLIST, albumsList)
                that.listReady = true
              }
            })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  getAlbum (store, that) {
    let album = {}
    Vue.http.get(store.state.domain + '/vue/album' + '?id=' + that.$route.query.id)
      .then(res => {
        album = {
          photos: res.data.photos,
          albumName: res.data.albumName,
          memory: res.data.memory,
          feelings: res.data.feelings,
          music: res.data.music,
          userInfo: res.data.userInfo,
          createOn: new Date(res.data.createOn)
        }
        store.commit(UPDATE_TITLE, album.albumName)
        return Vue.http.get(store.state.domain + '/api/get/song/qq' + '?id=' + album.music.id)
      })
      .then(res => {
        album.music.src = res.data.url
        return Vue.http.get(store.state.domain + '/vue/user' + '?id=' + album.userInfo.open_id)
      })
      .then(res => {
        album.userInfo.nickName = res.data.nickName
        album.userInfo.avatar = res.data.avatarUrl
        let flag = 0
        let run = 0
        for (let i = 0; i < album.photos.length; i++) {
          run++
          Vue.http.get(store.state.domain + '/api/downloadUrl' + '?key=' + album.photos[i])
            .then(res => {
              album.photos[i] = res.data.downloadUrl
              flag++
              if (flag === run) {
                store.commit(UPDATE_ALBUM, album)
                that.albumReady = true
              }
            })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
