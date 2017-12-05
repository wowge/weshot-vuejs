<template lang="pug">
  .container
    .row.well(v-if="!listReady")
      span 正在读取中...
    br
    .row(v-if="listReady")
      .col-xs-12
        .list-group
          template(v-for="album in albumsList" v-if="typeof album !== 'undefined'")
            .col-xs-12.col-md-6
              .list-group-item.well
                img.img-thumbnail.img-responsive(:src="album.cover")
                p {{ album.title }}
                .right
                  a(@click="gotoAlbum(album.id)")
                    i.glyphicon.glyphicon-chevron-right
                    i.glyphicon.glyphicon-chevron-right
                hr
                .right {{ album.author.nickName }}
                  img.img-circle(style="width:10%;height:10%;" :src="album.author.avatar")
                  p {{ album.createOn | date }}

</template>

<style scoped>

</style>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import _ from 'underscore'
  import VueAplayer from 'vue-aplayer'

  export default {
    data () {
      return {
        listReady: false
      }
    },
    components: {
      VueAplayer
    },
    methods: _.extend(
      {},
      mapActions(['getAlbumsList']),
      {
        gotoAlbum (id) {
          this.$router.push('/album?id=' + id)
        }
      }
    ),
    created () {
      this.getAlbumsList(this)
    },
    computed: mapGetters({
      user: 'getUser',
      albumsList: 'getList'
    })
  }
</script>
