<template>
  <div class="catalog-chapters">
    <LoadingDiv v-show="isLoadingCatalogChapters" />
    <ErrorDiv
      v-show="loadingCatalogChaptersFail"
      :retryCallback="loadCatalogChapters"
    />
    <div v-if="!(isLoadingCatalogChapters || loadingCatalogChaptersFail)">
      <div class="catalog-chapter">
        <div
          class="title text-ellipsis"
          v-for="(title, index) in catalogChapters"
          :key="index"
        >
          {{ title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
    ...mapActions([
      'loadCatalogChapters'
    ])
  }
}
</script>

<style lang="less" scoped>
.catalog-chapters {
  width: 100%;
  height: 100%;
}
</style>
