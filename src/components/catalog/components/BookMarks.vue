<template>
  <div class="book-marks">
    <LoadingDiv v-show="isLoadingBookmarks" />
    <ErrorDiv
      v-show="loadingBookmarksFail"
      :retryCallback="loadBookmarks"
    />
    <div v-if="!(isLoadingBookmarks || loadingBookmarksFail)">
      <div
        class="book-mark"
        v-if="bookmarks.length"
      >
        <div
          class="title text-ellipsis"
          v-for="({ chapterTitle, chapterIndex }) in bookmarks"
          :key="chapterIndex"
        >
          {{ chapterTitle }}
        </div>
      </div>
      <div v-else>
        TODO 暂时没有书签
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
      isLoadingBookmarks: state => state.catalog.isLoadingBookmarks,
      loadingBookmarksFail: state => state.catalog.loadingBookmarksFail,
      bookmarks: state => state.catalog.bookmarks
    })
  },
  methods: {
    ...mapActions([
      'loadBookmarks'
    ])
  }
}
</script>

<style lang="less" scoped>
.book-marks {
  width: 100%;
  height: 100%;
}
</style>
