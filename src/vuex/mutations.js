import * as types from './mutations_type'

export default {
  [types.UPDATE_USERINFO] (state, user) {
    state.user = user
  },
  [types.SET_LOGINERR] (state, loginErr) {
    state.loginErr = loginErr
  },
  [types.UPDATE_ALBUMSLIST] (state, albumsList) {
    state.albumsList = albumsList
  },
  [types.UPDATE_ALBUM] (state, album) {
    state.album = album
  },
  [types.UPDATE_TITLE] (state, title) {
    state.title = title
  }
}
