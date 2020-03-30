<template>
  <div
    v-show="deleteBookmarkShow"
    class="delete-bookmark"
    @click.stop="closeDeleteBookmark"
  >
    <div
      class="content"
      @click.stop
    >
      <div class="wrapper">
        <div class="title text-ellipsis">
          {{ chapterTitle }}
        </div>
        <div
          class="button"
          @click.stop="deleteBookmark"
        >
          删除
        </div>
        <div
          class="button"
          @click.stop="closeDeleteBookmark"
        >
          取消
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Catalog.DeleteBookmark',
  props: {
    chapterIndex: {
      type: Number,
      required: true
    },
    chapterTitle: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      domain: state => state.domain,
      novelName: state => state.novelName,
      authorName: state => state.authorName,
      deleteBookmarkShow: state => state.showState.deleteBookmarkShow
    })
  },
  data () {
    return {
      deleteBookmarkFailMessage: '删除书签失败了，请稍后重试',
      deleteBookmarkSuccessMessage: '删除书签成功'
    }
  },
  methods: {
    ...mapMutations([
      'setDeleteBookmarkShow',
      'setPromptMessage'
    ]),
    ...mapActions([
      'loadBookmarks'
    ]),
    /**
     * 删除书签
     */
    deleteBookmark () {
      const result = window.__browserObject.removeBookmark(this.domain, this.novelName, this.authorName, this.chapterIndex)
      if (result) {
        this.closeDeleteBookmark()
        this.setPromptMessage(this.deleteBookmarkSuccessMessage)
        this.loadBookmarks()
      } else {
        this.setPromptMessage(this.deleteBookmarkFailMessage)
      }
    },
    /**
     * 关闭删除书签
     */
    closeDeleteBookmark () {
      this.setDeleteBookmarkShow(false)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./../../../style/variables.less');

.delete-bookmark {
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: @coverBackground;
  .content {
    width: 100%;
    padding: 0 0.65rem;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 0.65rem;
    display: flex;
    flex-direction: column;
    .wrapper {
      background: @secondBackground;
      border-radius: 0.4rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 0.65rem;
      line-height: 1.3rem;
      text-align: center;
      .title {
        width: 100%;
        font-weight: bold;
        padding: 0 0.6rem;
        box-sizing: border-box;
      }
      .button {
        width: 100%;
        border-top: thin solid @borderColor;
      }
    }
  }
}
.night-mode {
  .delete-bookmark {
    background: @coverBackgroundNight;
    .content {
      .wrapper {
        background: @backgroundNight;
      }
    }
  }
}
</style>
