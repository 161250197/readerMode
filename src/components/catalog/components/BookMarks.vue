<template>
  <div class="book-marks-wrapper">
    <LoadingDiv v-show="isLoadingBookMarks" />
    <ErrorDiv
      v-show="loadingBookMarksFail"
      :retryCallback="loadBookMarks"
    />
    <div v-if="!(isLoadingBookMarks || loadingBookMarksFail)">
      <div
        class="book-mark-wrapper"
        v-if="bookMarks.length"
      >
        <div
          class="title-wrapper text-ellipsis"
          v-for="({ chapterTitle, chapterIndex }) in bookMarks"
          :key="chapterIndex"
        >
          {{chapterTitle}}
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
  name: 'Catalog.BookMarks',
  components: {
    LoadingDiv,
    ErrorDiv
  },
  computed: {
    ...mapState({
      isLoadingBookMarks: state => state.catalog.isLoadingBookMarks,
      loadingBookMarksFail: state => state.catalog.loadingBookMarksFail,
      bookMarks: state => state.catalog.bookMarks
    })
  },
  methods: {
    ...mapActions([
      'loadBookMarks'
    ])
  }
}
</script>

<style lang="less" scoped>
.book-marks-wrapper {
  width: 100%;
  height: 100%;
}
</style>
