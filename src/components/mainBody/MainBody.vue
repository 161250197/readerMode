<template>
  <div
    class="main-body-wrapper"
    @click.stop="showCatalog"
  >
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
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'mainBody',
  computed: {
    ...mapState({
      chapters: state => state.mainBody.chapters
    })
  },
  methods: {
    ...mapMutations([
      'setCatalogShow'
    ]),
    /**
     * 显示目录栏
     * TODO 需要之后修改为显示菜单栏
     */
    showCatalog () {
      this.setCatalogShow(true)
    }
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
