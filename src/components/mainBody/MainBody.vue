<template>
  <div class="main-body-wrapper">
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
  name: 'mainBody',
  computed: {
    ...mapState({
      chapters: state => state.mainBody.chapters
    })
  }
}
</script>

<style lang="less" scoped>
.main-body-wrapper {
  height: 100%;
  overflow-y: scroll;
  position: fixed;
  left: 0;
  top: 0;
}
</style>
