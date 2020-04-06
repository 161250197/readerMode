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
      class="book-mall"
      @click.stop="jumpToBookMall"
    >
      <img
        class="day-mode-item"
        src="./../../../assets/book-mall.png"
        alt="day mode bookMall icon"
      />
      <img
        class="night-mode-item"
        src="./../../../assets/book-mall-night.png"
        alt="night mode bookMall icon"
      />
      书城
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
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { addBookmarkFailMessage, addBookmarkSuccessMessage } from './../../../utils/consts.js'

export default {
  name: 'UserMenu.TopUserMenu',
  computed: {
    ...mapState({
      chapterIndex: state => state.chapterIndex,
      bookId: state => state.bookId,
      domain: state => state.domain,
      novelName: state => state.novelName,
      authorName: state => state.authorName,
      readingChapterTitle: state => state.mainBody.readingChapterTitle,
      readingChapterIsBookmarked: state => state.mainBody.readingChapterIsBookmarked
    })
  },
  data () {
    return {
      jumpToBookMallFailMessage: '跳转小说书城失败，请稍后重试',
      addBookmarkFailMessage,
      addBookmarkSuccessMessage
    }
  },
  methods: {
    ...mapMutations([
      'setPromptMessage',
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
     * 跳转小说书城
     */
    jumpToBookMall () {
      const result = window.__browserObject.jumpToBookMall(this.bookId)
      if (result) {
        this.setUserMenuShow(false)
      } else {
        this.setPromptMessage(this.jumpToBookMallFailMessage)
      }
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
      const result = window.__browserObject.addBookmark(this.domain, this.novelName, this.authorName, this.chapterIndex, this.readingChapterTitle)
      if (result) {
        this.setPromptMessage(this.addBookmarkSuccessMessage)
        this.loadBookmarks()
      } else {
        this.setPromptMessage(this.addBookmarkFailMessage)
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
    top: 0;
    left: 0;
    padding: 0.2rem 0 0.2rem 0.45rem;
    > img {
      width: 1rem;
    }
  }
  .book-mall {
    position: fixed;
    height: 0.8rem;
    top: 0.3rem;
    right: 4.6rem;
    display: flex;
    align-items: center;
    font-size: 0.5rem;
    > img {
      width: 0.8rem;
      margin-right: 0.2rem;
    }
  }
  .bookmark {
    position: fixed;
    top: 0.35rem;
    right: 0.7rem;
    display: flex;
    align-items: center;
    > img {
      width: 0.7rem;
    }
  }
}
.night-mode {
  .top-user-menu {
    background: @secondBackgroundNight;
  }
}
</style>
