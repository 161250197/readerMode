<template>
  <div class="background item">
    <div class="title">
      背景色
    </div>
    <div class="content">
      <div
        class="background-item"
        v-for="(background, index) in backgroundColors"
        :key="index"
        :class="{ 'select': backgroundColor === background }"
        :style="{ background: background }"
        @click.stop="() => setBackground(background)"
      >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { backgroundColors } from './../../../../../utils/consts.js'

export default {
  name: 'UserMenu.Setting.Background',
  computed: {
    ...mapState({
      nightMode: state => state.userConfig.nightMode,
      backgroundColor: state => state.userConfig.backgroundColor
    })
  },
  data () {
    return {
      backgroundColors
    }
  },
  methods: {
    ...mapMutations([
      'setNightMode',
      'setBackgroundColor'
    ]),
    /**
     * 设置背景色
     * - 自动退出夜间模式
     */
    setBackground (background) {
      if (this.nightMode) {
        this.setNightMode(false)
      }
      if (this.backgroundColor === background) {
        return
      }
      this.setBackgroundColor(background)
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./../../../../../style/variables.less');
@import url('./../setting-item.less');

.background {
  justify-content: space-between;
  .content {
    justify-content: space-between;
    .background-item {
      box-sizing: border-box;
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      &.select {
        border: thin solid @primaryColor;
      }
    }
  }
}
.night-mode {
  .background {
    .content {
      .background-item {
        &.select {
          border-color: @borderColorNight;
        }
      }
    }
  }
}
</style>
