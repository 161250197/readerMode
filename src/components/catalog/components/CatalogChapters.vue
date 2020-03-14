<template>
  <div class="catalog-chapters-wrapper">
    <div
      class="catalog-chapter-wrapper"
      v-for="(title, index) in catalogChapters"
      :key="index"
    >
      <div class="title-wrapper">
        {{title}}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Catalog.CatalogChapters',
  computed: {
    ...mapState({
      isLoadingCatalogChapters: state => state.catalog.isLoadingCatalogChapters,
      loadingCatalogChaptersFail: state => state.catalog.loadingCatalogChaptersFail,
      catalogChapters: state => state.catalog.catalogChapters
    })
  }
}
</script>

<style lang="less" scoped>
.catalog-chapters-wrapper {
  width: 100%;
  height: 100%;
  .title-wrapper {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
