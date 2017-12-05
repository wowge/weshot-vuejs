<template lang="pug">
  .container
    .row.well(v-if="!albumReady")
      span 正在读取中...
    .row(v-if="albumReady")
      .col-xs-12
        VueAplayer(:music="{title:album.music.name, author:album.music.authors, url:album.music.src, pic:album.music.poster}")
        br
        br
        .list-group
            template(v-for="(photo, index) in album.photos")
              .col-xs-12.col-md-6
                .list-group-item.well
                  .list-group-item-heading {{ album.feelings[index] }}
                  a(target="_blank" :href="photo" rel="noopener")
                    img.img-responsive.img-thumbnail(:src="photo")
    br
    br
    .row(v-if="albumReady")
      .panel.panel-info
        .panel-heading
          .panel-title 寄语
        .panel-body {{ album.memory }}
        .right(style="font-size:20px") {{ album.userInfo.nickName }}
          img.img-circle(style="width:10%;height:10%;" :src="album.userInfo.avatar")
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
        albumReady: false
      }
    },
    components: {
      VueAplayer
    },
    methods: _.extend(
      {},
      mapActions(['getAlbum']),
      {
      }
    ),
    created () {
      this.getAlbum(this)
    },
    computed: mapGetters({
      album: 'getAlbumItem'
    })
  }
</script>
