export default {
  getUser (state) {
    return state.user
  },
  getLoginErr (state) {
    return state.loginErr
  },
  getList (state) {
    return state.albumsList
  },
  getAlbumItem (state) {
    return state.album
  },
  getTitle (state) {
    return state.title
  }
}
