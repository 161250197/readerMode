<template>
  <div
    class="catalog"
    @click.stop="hideCatalog"
  >
    <div class="page">
      <div class="novel-info">
        <div class="novel-name text-ellipsis">
          {{ novelName }}
        </div>
        <div class="author-name text-ellipsis">
          {{ authorName }}
        </div>
      </div>
      <div class="content">
        <CatalogChapters v-show="tabIndex === 0" />
        <BookMarks v-show="tabIndex === 1" />
      </div>
      <div class="tabs">
        <div
          class="tab"
          v-for="(tab, index) in tabs"
          :key="index"
          @click.stop="() => updateTabIndex(index)"
        >
          {{ tab }}
        </div>
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
.catalog {
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  .page {
    height: 100%;
    width: 80%;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    background: white;
    .content {
      flex: 1;
      overflow-y: scroll;
    }
    .tabs {
      display: flex;
      .tab {
        flex: 1;
        text-align: center;
      }
    }
  }
}
</style>
