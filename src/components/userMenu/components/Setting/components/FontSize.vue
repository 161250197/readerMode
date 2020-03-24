<template>
  <div class="font-size item">
    <div class="title">
      字体大小
    </div>
    <div class="content">
      <div class="prompt">
        小
      </div>
      <div class="range">
        <div class="range-line">
          <div
            class="separate"
            v-for="(fontSize, index) in fontSizes"
            :key="index"
          >
          </div>
        </div>
        <div class="range-cursor"></div>
      </div>
      <div class="prompt">
        超大
      </div>
    </div>
  </div>
</template>

<script>
import { fontSizes } from './../../../../../utils/consts.js'

export default {
  name: 'UserMenu.Setting.FontSize',
  data () {
    return {
      fontSizes
    }
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
      .range-line {
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
        transform: translate(-50%, -50%);
      }
    }
  }
}
.night-mode {
  .font-size {
    .content {
      .range {
        .range-line,
        .separate {
          background: @fontColorNight;
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
