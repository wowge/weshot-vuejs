import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import AlbumsList from '@/components/AlbumsList'
import Album from '@/components/Album'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/albumsList',
      name: 'AlbumsList',
      component: AlbumsList
    }, {
      path: '/album',
      name: 'Album',
      component: Album
    }
  ]
})
