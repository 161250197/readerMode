<template>
  <div class="font-size item">
    <div class="title">
      字体大小
    </div>
    <div class="content">
      <div
        class="prompt"
        @click.stop="setMinFontSize"
      >
        小
      </div>
      <div
        class="range"
        @touchstart="onRangeTouchstart"
        @touchmove.prevent="onRangeTouchmove"
        @touchend="onRangeTouchend"
        @touchcancel="onRangeTouchend"
      >
        <div class="range-line">
          <div
            class="separate"
            ref="separate"
            v-for="(fontSize, index) in fontSizes"
            :key="index"
          >
          </div>
        </div>
        <div
          class="range-cursor"
          :class="{ 'moving': isMoving }"
          :style=" { left: `${left}px` }"
        ></div>
      </div>
      <div
        class="prompt"
        @click.stop="setMaxFontSize"
      >
        超大
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { fontSizes } from './../../../../../utils/consts.js'

export default {
  name: 'UserMenu.Setting.FontSize',
  computed: {
    ...mapState({
      deviceSize: state => state.deviceData.deviceSize,
      fontSize: state => state.userConfig.fontSize
    })
  },
  data () {
    const fontSizeCount = fontSizes.length
    return {
      fontSizes,
      separateLefts: [],
      fontSizeCount,
      isMoving: false,
      minLeft: undefined,
      maxLeft: undefined,
      left: undefined
    }
  },
  watch: {
    /**
     * 设备尺寸更新时需要更新章节相关数据
     * - 更新分割线位置
     * - 更新游标位置
     */
    deviceSize () {
      this.$nextTick(() => {
        this.updateSeparateLefts()
        this.updateCursorLeft()
      })
    }
  },
  methods: {
    ...mapMutations([
      'setFontSize'
    ]),
    /**
     * 更新分割线位置
     */
    updateSeparateLefts () {
      const separateLefts = this.$refs.separate.map(ref => ref.getBoundingClientRect().left)
      this.minLeft = separateLefts[0]
      this.maxLeft = separateLefts[this.fontSizeCount - 1]
      this.separateLefts = separateLefts
    },
    /**
     * 更新游标位置
     */
    updateCursorLeft () {
      this.left = this.separateLefts[fontSizes.indexOf(this.fontSize)]
    },
    /**
     * 设置为最小字体
     */
    setMinFontSize () {
      this.setFontSize(fontSizes[0])
      this.updateCursorLeft()
    },
    /**
     * 设置为最大字体
     */
    setMaxFontSize () {
      this.setFontSize(fontSizes[this.fontSizeCount - 1])
      this.updateCursorLeft()
    },
    /**
     * 获取安全位置
     * @param {Number} left 位置
     * @return {Number} 安全位置
     */
    getSafeCursorLeft (left) {
      if (left < this.minLeft) {
        return this.minLeft
      } else if (left > this.maxLeft) {
        return this.maxLeft
      }
      return left
    },
    /**
     * touchstart 事件处理
     * @param {TouchEvent} e
     */
    onRangeTouchstart (e) {
      this.isMoving = true
      this.left = this.getSafeCursorLeft(e.touches[0].clientX)
    },
    /**
     * touchmove 事件处理
     * @param {TouchEvent} e
     */
    onRangeTouchmove (e) {
      this.left = this.getSafeCursorLeft(e.touches[0].clientX)
    },
    /**
     * touchend 事件处理
     */
    onRangeTouchend () {
      for (let i = this.fontSizeCount - 1; i > 0; i--) {
        if (this.separateLefts[i] - this.left < this.left - this.separateLefts[i - 1]) {
          this.setFontSize(fontSizes[i])
          this.isMoving = false
          this.updateCursorLeft()
          return
        }
      }
      this.setFontSize(fontSizes[0])
      this.isMoving = false
      this.updateCursorLeft()
    }
  },
  mounted () {
    this.updateSeparateLefts()
    this.updateCursorLeft()
  }
}
</script>

<style lang="less" scoped>
@import url('./../../../../../style/variables.less');
@import url('./../setting-item.less');

.font-size {
  justify-content: space-between;
  .content {
    justify-content: space-between;
    position: fixed;
    right: 0.4rem;
    .prompt {
      font-size: 0.4rem;
      &:first-child {
        margin-right: 0.4rem;
      }
      &:last-child {
        margin-left: 0.4rem;
      }
    }
    .range {
      flex: 1;
      height: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .range-line {
        width: 100%;
        background: @fontColor;
        height: 0.05rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .separate {
          background: @fontColor;
          height: 0.25rem;
          width: 0.05rem;
        }
      }
      .range-cursor {
        box-sizing: border-box;
        width: 0.35rem;
        height: 0.35rem;
        border-radius: 50%;
        background: @secondBackground;
        border: 0.05rem solid @borderColor;
        position: fixed;
        transform: translateX(-50%);
        transition: left 0.2s;
        &.moving {
          transition: none;
        }
      }
    }
  }
}
.night-mode {
  .font-size {
    .content {
      .range {
        .range-line {
          background: @fontColorNight;
          .separate {
            background: @fontColorNight;
          }
        }
        .range-cursor {
          background: @secondBackgroundNight;
          border-color: @borderColorNight;
        }
      }
    }
  }
}
</style>
