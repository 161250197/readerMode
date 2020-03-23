<template>
  <div
    class="catalog"
    @click.stop="hideCatalog"
  >
    <div
      class="page"
      :style="{
        background: nightMode ? nightModeBackgroundColor : backgroundColor
      }"
      @click.stop
    >
      <div class="novel-info">
        <div class="novel-name text-ellipsis">
          {{ novelName }}
        </div>
        <div class="author-name text-ellipsis">
          {{ authorName }}
        </div>
      </div>
      <div class="content">
        <CatalogChapters v-show="catalogChaptersShow" />
        <Bookmarks v-show="catalogBookmarksShow" />
      </div>
      <div class="tabs">
        <div
          class="tab"
          :class="{ 'selected': catalogChaptersShow }"
          @click.stop="showCatalogChapters"
        >
          目录
        </div>
        <div
          class="tab"
          :class="{ 'selected': catalogBookmarksShow }"
          @click.stop="showCatalogBookmarks"
        >
          书签
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { nightModeBackgroundColor } from './../../utils/consts'
import Bookmarks from './components/Bookmarks'
import CatalogChapters from './components/CatalogChapters'

export default {
  name: 'Catalog',
  components: {
    Bookmarks,
    CatalogChapters
  },
  computed: {
    ...mapState({
      backgroundColor: state => state.userConfig.backgroundColor,
      nightMode: state => state.userConfig.nightMode,
      catalogChaptersShow: state => state.showState.catalogChaptersShow,
      catalogBookmarksShow: state => state.showState.catalogBookmarksShow,
      novelName: state => state.novelName,
      authorName: state => state.authorName
    })
  },
  data () {
    return {
      nightModeBackgroundColor
    }
  },
  methods: {
    ...mapMutations([
      'setCatalogBookmarksShow',
      'setCatalogChaptersShow'
    ]),
    /**
     * 显示目录章节页
     */
    showCatalogChapters () {
      this.setCatalogChaptersShow(true)
    },
    /**
     * 显示目录书签页
     */
    showCatalogBookmarks () {
      this.setCatalogBookmarksShow(true)
    },
    /**
     * 隐藏目录栏
     */
    hideCatalog () {
      this.setCatalogChaptersShow(false)
      this.setCatalogBookmarksShow(false)
    }
  }
}
</script>

<style lang="less" scoped>
.catalog {
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  .page {
    height: 100%;
    width: 80%;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    background: white;
    .content {
      flex: 1;
      overflow-y: scroll;
    }
    .tabs {
      display: flex;
      .tab {
        flex: 1;
        text-align: center;
      }
    }
  }
}
.night-mode {
  .catalog {
    .page {
      background: black;
    }
  }
}
</style>
