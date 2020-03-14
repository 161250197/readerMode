<template>
  <div
    class="catalog-wrapper"
    @click.stop="hideCatalog"
  >
    <div class="novel-info-wrapper">
      <div class="novel-name-wrapper text-ellipsis">
        {{novelName}}
      </div>
      <div class="author-name-wrapper text-ellipsis">
        {{authorName}}
      </div>
    </div>
    <div class="content-wrapper">
      <CatalogChapters v-show="tabIndex === 0" />
      <BookMarks v-show="tabIndex === 1" />
    </div>
    <div class="tabs-wrapper">
      <div
        class="tab"
        v-for="(tab, index) in tabs"
        :key="index"
        @click.stop="() => updateTabIndex(index)"
      >
        {{tab}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import BookMarks from './components/BookMarks'
import CatalogChapters from './components/CatalogChapters'

export default {
  name: 'Catalog',
  components: {
    BookMarks,
    CatalogChapters
  },
  computed: {
    ...mapState({
      novelName: state => state.novelName,
      authorName: state => state.authorName
    })
  },
  data () {
    return {
      tabs: ['目录', '书签'],
      tabIndex: 0
    }
  },
  methods: {
    ...mapMutations([
      'setCatalogShow'
    ]),
    /**
     * 更新 tab 索引
     * @param {Number} tabIndex tab 索引
     */
    updateTabIndex (tabIndex) {
      this.tabIndex = tabIndex
    },
    /**
     * 隐藏目录栏
     */
    hideCatalog () {
      this.setCatalogShow(false)
    }
  }
}
</script>

<style lang="less" scoped>
.catalog-wrapper {
  height: 100%;
  width: 100%;
  background: white;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  .content-wrapper {
    flex: 1;
    overflow-y: scroll;
  }
  .tabs-wrapper {
    display: flex;
    .tab {
      flex: 1;
      text-align: center;
    }
  }
}
</style>
