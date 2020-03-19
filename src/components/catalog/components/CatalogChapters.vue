<template>
  <div class="catalog-chapters">
    <LoadingDiv v-show="isLoadingCatalogChapters" />
    <ErrorDiv
      v-show="loadingCatalogChaptersFail"
      :retryCallback="loadCatalogChapters"
    />
    <div
      v-if="!(isLoadingCatalogChapters || loadingCatalogChaptersFail)"
      class="catalog-chapter"
    >
      <div
        class="title text-ellipsis"
        v-for="(title, index) in catalogChapters"
        :key="index"
        @click.stop="() => jumpChapters(index)"
      >
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import LoadingDiv from './../../utils/LoadingDiv'
import ErrorDiv from './../../utils/ErrorDiv'

export default {
  name: 'Catalog.CatalogChapters',
  components: {
    LoadingDiv,
    ErrorDiv
  },
  computed: {
    ...mapState({
      isLoadingCatalogChapters: state => state.catalog.isLoadingCatalogChapters,
      loadingCatalogChaptersFail: state => state.catalog.loadingCatalogChaptersFail,
      catalogChapters: state => state.catalog.catalogChapters
    })
  },
  methods: {
    ...mapMutations([
      'setCatalogShow',
      'setChapterIndex'
    ]),
    ...mapActions([
      'loadMainBodyContent',
      'loadCatalogChapters'
    ]),
    /**
     * 跳转章节
     * @param {Number} chapterIndex
     */
    jumpChapters (chapterIndex) {
      this.setCatalogShow(false)
      this.setChapterIndex(chapterIndex)
      this.loadMainBodyContent()
    }
  }
}
</script>

<style lang="less" scoped>
.catalog-chapters {
  width: 100%;
  height: 100%;
}
</style>
