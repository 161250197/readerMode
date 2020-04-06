<template>
  <div
    class="top-user-menu"
    @click.stop
  >
    <div class="left-wrapper">
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
    </div>
    <div class="right-wrapper">
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
        v-if="bookshelfAdded"
        class="bookshelf"
        @click.stop="jumpToBookshelf"
      >
        <img
          class="day-mode-item"
          src="./../../../assets/added-bookshelf.png"
          alt="day mode jump to bookshelf icon"
        />
        <img
          class="night-mode-item"
          src="./../../../assets/added-bookshelf-night.png"
          alt="night mode jump to bookshelf icon"
        />
        查看书架
      </div>
      <div
        v-else
        class="bookshelf"
        @click.stop="addBookshelf"
      >
        <img
          class="day-mode-item"
          src="./../../../assets/add-bookshelf.png"
          alt="day mode add bookshelf icon"
        />
        <img
          class="night-mode-item"
          src="./../../../assets/add-bookshelf-night.png"
          alt="night mode add bookshelf icon"
        />
        加入书架
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
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { addBookmarkFailMessage, addBookmarkSuccessMessage } from './../../../utils/consts.js'

export default {
  name: 'UserMenu.TopUserMenu',
  computed: {
    ...mapState({
      bookshelfAdded: state => state.userConfig.bookshelfAdded,
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
      jumpToBookshelfFailMessage: '跳转小说书架失败，请稍后重试',
      addBookshelfSuccessMessage: '添加小说书架成功',
      addBookshelfFailMessage: '添加小说书架失败了，请稍后重试',
      addBookmarkFailMessage,
      addBookmarkSuccessMessage
    }
  },
  methods: {
    ...mapMutations([
      'setBookshelfAdded',
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
     * 跳转小说书架
     */
    jumpToBookshelf () {
      const result = window.__browserObject.jumpToBookshelf()
      if (result) {
        this.setUserMenuShow(false)
      } else {
        this.setPromptMessage(this.jumpToBookshelfFailMessage)
      }
    },
    /**
     * 添加书架
     */
    addBookshelf () {
      const result = window.__browserObject.addBookshelf(this.novelName, this.authorName)
      if (result) {
        this.setPromptMessage(this.addBookshelfSuccessMessage)
        this.setBookshelfAdded(true)
      } else {
        this.setPromptMessage(this.addBookshelfFailMessage)
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 1.4rem;
  background: @secondBackground;
  .left-wrapper {
    .back {
      height: 1rem;
      margin-left: 0.45rem;
      > img {
        width: 1rem;
      }
    }
  }
  .right-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
    .book-mall {
      display: flex;
      align-items: center;
      height: 0.8rem;
      margin-right: 0.4rem;
      font-size: 0.5rem;
      > img {
        width: 0.8rem;
        margin-right: 0.2rem;
      }
    }
    .bookshelf {
      display: flex;
      align-items: center;
      height: 0.8rem;
      margin-right: 0.4rem;
      font-size: 0.5rem;
      > img {
        width: 0.8rem;
        margin-right: 0.2rem;
      }
    }
    .bookmark {
      display: flex;
      align-items: center;
      margin-right: 0.7rem;
      > img {
        width: 0.7rem;
      }
    }
  }
}
.night-mode {
  .top-user-menu {
    background: @secondBackgroundNight;
  }
}
</style>
