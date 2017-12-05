import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  domain: 'https://weshot.wowge.org',
  user: {},
  loginErr: '',
  albumsList: [],
  album: {},
  title: '似水流年小相册'
}

export default new Vuex.Store({
  state, actions, mutations, getters
})
