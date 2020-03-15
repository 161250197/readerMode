<template>
  <div class="left-right-wrapper">
    <div
      class="chapter-wrapper"
      v-for="({ text, title, chapterIndex }) in chapters"
      :key="chapterIndex"
    >
      <div class="title-wrapper">
        {{title}}
      </div>
      <div
        class="text-wrapper"
        v-html="text"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MainBody.LeftRight',
  computed: {
    ...mapState({
      chapters: state => state.mainBody.chapters
    })
  }
}
</script>

<style lang="less" scoped>
.left-right-wrapper {
  height: 100%;
  column-width: 10.8rem;
}
</style>
