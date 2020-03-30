<template>
  <div class="bookmarks">
    <LoadingDiv
      :prompt="loadingPrompt"
      v-if="isLoadingBookmarks"
    />
    <ErrorDiv
      :prompt="errorPrompt"
      v-else-if="loadBookmarksFail"
      :retryCallback="loadBookmarks"
    />
    <div
      v-else
      class="bookmark">
      <div
        class="title text-ellipsis"
        :class="{ 'reading-chapter': chapterIndex === presentChapterIndex }"
        v-for="({ chapterTitle, chapterIndex }) in bookmarks"
        :key="chapterIndex"
        @click.stop="() => jumpChapter(chapterIndex)"
      >
        {{ chapterTitle }}
      </div>
      <div
        v-if="!readingChapterIsBookmarked"
        class="add-bookmark-wrapper"
      >
        <div
          class="add-bookmark"
          @click="addBookmark"
        >
          点击添加书签
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { addBookmarkFailMessage, addBookmarkSuccessMessage } from './../../../utils/consts.js'
import LoadingDiv from './../../utils/LoadingDiv'
import ErrorDiv from './../../utils/ErrorDiv'

export default {
  name: 'Catalog.Bookmarks',
  components: {
    LoadingDiv,
    ErrorDiv
  },
  computed: {
    ...mapState({
      domain: state => state.domain,
      novelName: state => state.novelName,
      authorName: state => state.authorName,
      presentChapterIndex: state => state.chapterIndex,
      readingChapterTitle: state => state.mainBody.readingChapterTitle,
      readingChapterIsBookmarked: state => state.mainBody.readingChapterIsBookmarked,
      isLoadingBookmarks: state => state.catalog.isLoadingBookmarks,
      loadBookmarksFail: state => state.catalog.loadBookmarksFail,
      bookmarks: state => state.catalog.bookmarks
    })
  },
  data () {
    return {
      addBookmarkFailMessage,
      addBookmarkSuccessMessage,
      loadingPrompt: '正在加载书签',
      errorPrompt: '加载书签出错了'
    }
  },
  methods: {
    ...mapMutations([
      'setPromptMessage',
      'setCatalogBookmarksShow',
      'setChapterIndex'
    ]),
    ...mapActions([
      'loadMainBodyContent',
      'loadBookmarks'
    ]),
    /**
     * 跳转章节
     * @param {Number} chapterIndex
     */
    jumpChapter (chapterIndex) {
      if (chapterIndex !== this.presentChapterIndex) {
        this.setCatalogBookmarksShow(false)
        this.setChapterIndex(chapterIndex)
        this.loadMainBodyContent()
      }
    },
    /**
     * 添加书签
     */
    addBookmark () {
      const result = window.__browserObject.addBookmark(this.domain, this.novelName, this.authorName, this.presentChapterIndex, this.readingChapterTitle)
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

.bookmarks {
  width: 100%;
  height: 100%;
  .bookmark {
    .title {
      font-size: 0.6rem;
      line-height: 1rem;
      &.reading-chapter {
        color: @primaryColor;
      }
    }
    .add-bookmark-wrapper {
      width: 100%;
      padding: 0.4rem 0;
      display: flex;
      justify-content: center;
      align-items: center;
      .add-bookmark {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        font-size: 0.5rem;
        line-height: 0.4rem;
        height: 0.8rem;
        padding: 0 0.4rem;
        border: 0.05rem solid @borderColor;
        border-radius: 0.4rem;
        font-weight: bold;
      }
    }
  }
}
.night-mode {
  .bookmarks {
    .bookmark {
      .title {
        &.reading-chapter {
          color: @primaryColorNight;
        }
      }
      .add-bookmark-wrapper {
        .add-bookmark {
          border-color: @borderColorNight;
        }
      }
    }
  }
}
</style>
