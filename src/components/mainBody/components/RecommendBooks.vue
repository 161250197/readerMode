<template>
  <div class="recommend-books">
    <div class="title">
      为您推荐更多精品好书
    </div>
    <div class="content">
      <LoadingDiv v-if="!recommendBooks.length" />
      <div
        class="recommend-book"
        v-for="({ bookId, cover, novelName }, index) in recommendBooks"
        :key="index"
        @click.stop="() => jumpToBookMall(bookId)"
      >
        <img
          :src="cover"
          alt="recommend book cover picture"
        />
        <div class="novel-name text-ellipsis-2">
          {{ novelName }}
        </div>
      </div>
    </div>
    <div
      class="enter-book-mall"
      @click.stop="() => jumpToBookMall()"
    >
      进入小说书城
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import LoadingDiv from './../../utils/LoadingDiv'

export default {
  name: 'MainBody.RecommendBooks',
  components: {
    LoadingDiv
  },
  computed: {
    ...mapState({
      recommendBooks: state => state.ad.recommendBooks
    })
  },
  methods: {
    ...mapActions([
      'loadRecommendBooks'
    ]),
    /**
     * 跳转小说书城
     */
    jumpToBookMall (bookId) {
      console.log(bookId)
      const result = window.__browserObject.jumpToBookMall(bookId)
      if (result) {
        console.log('[INFO] jumpToBookMall success')
      } else {
        console.log('[INFO] jumpToBookMall fail')
      }
    }
  },
  mounted () {
    if (!this.recommendBooks.length) {
      this.loadRecommendBooks()
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./../../../style/variables.less');

.recommend-books {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0.6rem 0;
  .title {
    font-size: 0.45rem;
    line-height: 1rem;
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    .recommend-book {
      width: 3rem;
      height: 5.2rem;
      display: flex;
      flex-direction: column;
      align-content: center;
      margin: 0.2rem 0;
      img {
        width: 3rem;
        height: 4rem;
        margin-bottom: 0.2rem;
      }
      .novel-name {
        font-size: 0.4rem;
        line-height: 0.5rem;
        height: 1rem;
      }
    }
  }
  .enter-book-mall {
    font-size: 0.45rem;
    line-height: 1rem;
    padding: 0 0.4rem;
    border: 0.05rem solid @borderColor;
    border-radius: 0.4rem;
    font-weight: bold;
  }
}
.night-mode {
  .recommend-books {
    .content {
      .recommend-book {
        img {
          filter: brightness(0.5);
        }
      }
    }
    .enter-book-mall {
      border-color: @borderColorNight;
    }
  }
}
</style>
