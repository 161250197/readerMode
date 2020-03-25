<template>
  <div
    class="top-user-menu"
    @click.stop
  >
    <div
      class="back"
      @click.stop="quitReaderMode"
    >
      <img
        class="day-mode-item"
        src="./../../../assets/back.png"
        alt="day mode back icon"
      />
      <img
        class="night-mode-item"
        src="./../../../assets/back-night.png"
        alt="night mode back icon"
      />
    </div>
    <div
      class="change-source"
      :class="{ 'active': changeSourceShow }"
      @click.stop="openChangeSource"
    >
      <img
        class="day-mode-item active-item"
        src="./../../../assets/refresh-active.png"
        alt="day mode refresh-active icon"
      />
      <img
        class="night-mode-item active-item"
        src="./../../../assets/refresh-active-night.png"
        alt="night mode refresh-active icon"
      />
      <img
        class="day-mode-item inactive-item"
        src="./../../../assets/refresh.png"
        alt="day mode refresh icon"
      />
      <img
        class="night-mode-item inactive-item"
        src="./../../../assets/refresh-night.png"
        alt="night mode refresh icon"
      />
      换源
    </div>
    <div
      v-if="readingChapterIsBookmarked"
      class="bookmark"
      @click.stop="seeBookmarks"
    >
      <img
        class="day-mode-item"
        src="./../../../assets/checked-bookmark.png"
        alt="day mode checked-bookmark icon"
      />
      <img
        class="night-mode-item"
        src="./../../../assets/checked-bookmark-night.png"
        alt="night mode checked-bookmark icon"
      />
    </div>
    <div
      v-else
      class="bookmark"
      @click.stop="addBookmark"
    >
      <img
        class="day-mode-item"
        src="./../../../assets/bookmark.png"
        alt="day mode bookmark icon"
      />
      <img
        class="night-mode-item"
        src="./../../../assets/bookmark-night.png"
        alt="night mode bookmark icon"
      />
    </div>
    <div class="change-source-wrapper">
      <ChangeSource v-if="changeSourceShow" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import ChangeSource from './ChangeSource'

export default {
  name: 'UserMenu.TopUserMenu',
  components: {
    ChangeSource
  },
  computed: {
    ...mapState({
      changeSourceShow: state => state.showState.changeSourceShow,
      domain: state => state.domain,
      novelName: state => state.novelName,
      authorName: state => state.authorName,
      readingChapterTitle: state => state.mainBody.readingChapterTitle,
      readingChapterIndex: state => state.mainBody.readingChapterIndex,
      chapters: state => state.mainBody.chapters,
      readingChapterIsBookmarked: state => state.mainBody.readingChapterIsBookmarked
    })
  },
  methods: {
    ...mapMutations([
      'setChangeSourceShow',
      'setUserMenuShow',
      'setCatalogBookmarksShow'
    ]),
    ...mapActions([
      'loadBookmarks'
    ]),
    /**
     * 退出阅读模式
     */
    quitReaderMode () {
      window.__browserObject.exitReaderMode()
      this.setUserMenuShow(false)
    },
    /**
     * 打开小说换源面板
     */
    openChangeSource () {
      this.setChangeSourceShow(!this.changeSourceShow)
    },
    /**
     * 查看书签
     */
    seeBookmarks () {
      this.setCatalogBookmarksShow(true)
    },
    /**
     * 添加书签
     */
    addBookmark () {
      const chapterIndex = this.chapters[this.readingChapterIndex].chapterIndex
      if (window.__browserObject.addBookmark(this.domain, this.novelName, this.authorName, chapterIndex, this.readingChapterTitle)) {
        console.log('[INFO] addBookmark success')
        this.loadBookmarks()
      } else {
        console.log('[ERROR] addBookmark fail')
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./../../../style/variables.less');

.top-user-menu {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 1.4rem;
  background: @secondBackground;
  .back {
    position: fixed;
    top: 0.2rem;
    left: 0.2rem;
    > img {
      width: 1rem;
    }
  }
  > .change-source {
    position: fixed;
    height: 0.8rem;
    top: 0.3rem;
    right: 2rem;
    display: flex;
    align-items: center;
    font-size: 0.5rem;
    &.active {
      color: @primaryColor;
    }
    > img {
      width: 0.8rem;
      margin-right: 0.2rem;
    }
  }
  .bookmark {
    position: fixed;
    top: 0.35rem;
    right: 0.6rem;
    > img {
      width: 0.7rem;
    }
  }
  .change-source-wrapper {
    margin-top: 1.4rem;
  }
}
.night-mode {
  .top-user-menu {
    background: @secondBackgroundNight;
    > .change-source {
      &.active {
        color: @primaryColorNight;
      }
    }
  }
}
</style>
