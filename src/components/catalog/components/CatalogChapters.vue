<template>
  <div class="catalog-chapters">
    <LoadingDiv
      :prompt="loadingPrompt"
      v-show="isLoadingCatalogChapters"
    />
    <ErrorDiv
      :prompt="errorPrompt"
      v-show="loadCatalogChaptersFail"
      :retryCallback="loadCatalogChapters"
    />
    <div
      v-if="!(isLoadingCatalogChapters || loadCatalogChaptersFail)"
      class="catalog-chapter"
    >
      <div
        class="title text-ellipsis"
        :class="{ 'reading-chapter': index === chapterIndex }"
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
      chapterIndex: state => state.chapterIndex,
      isLoadingCatalogChapters: state => state.catalog.isLoadingCatalogChapters,
      loadCatalogChaptersFail: state => state.catalog.loadCatalogChaptersFail,
      catalogChapters: state => state.catalog.catalogChapters
    })
  },
  data () {
    return {
      loadingPrompt: '正在加载章节目录',
      errorPrompt: '加载章节目录出错了'
    }
  },
  methods: {
    ...mapMutations([
      'setCatalogChaptersShow',
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
      if (chapterIndex !== this.chapterIndex) {
        this.setCatalogChaptersShow(false)
        this.setChapterIndex(chapterIndex)
        this.loadMainBodyContent()
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./../../../style/variables.less');

.catalog-chapters {
  width: 100%;
  height: 100%;
  .catalog-chapter {
    font-size: 0.6rem;
    line-height: 1rem;
    .title {
      &.reading-chapter {
        color: @primaryColor;
      }
    }
  }
}
.night-mode {
  .catalog-chapters {
    .catalog-chapter {
      .title {
        &.reading-chapter {
          color: @primaryColorNight;
        }
      }
    }
  }
}
</style>
