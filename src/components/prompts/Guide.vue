<template>
  <div
    class="guide"
    @click.stop="setGuideShowed"
  >
    <div class="cover">
      <div class="top"></div>
      <div class="center"></div>
      <div class="bottom"></div>
    </div>
    <div class="prompt-wrapper">
      <div class="go-prev">
        <img
          class="day-mode-item"
          src="./../../assets/click.png"
          alt="day mode go prev click icon"
        />
        <img
          class="night-mode-item"
          src="./../../assets/click-night.png"
          alt="night mode go prev click icon"
        />
        <div class="prompt">
          {{ goPrevPrompt }}
        </div>
      </div>
      <div class="show-user-menu">
        <img
          class="day-mode-item"
          src="./../../assets/click.png"
          alt="day mode show user menu click icon"
        />
        <img
          class="night-mode-item"
          src="./../../assets/click-night.png"
          alt="night mode show user menu click icon"
        />
        <div class="prompt">
          {{ showUserMenuPrompt }}
        </div>
      </div>
      <div class="go-next">
        <img
          class="day-mode-item"
          src="./../../assets/click.png"
          alt="day mode go next click icon"
        />
        <img
          class="night-mode-item"
          src="./../../assets/click-night.png"
          alt="night mode go next click icon"
        />
        <div class="prompt">
          {{ goNextPrompt }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Prompts.Guide',
  data () {
    return {
      goPrevPrompt: '上一页',
      showUserMenuPrompt: '菜单',
      goNextPrompt: '下一页'
    }
  },
  methods: {
    ...mapActions([
      'setGuideShowed'
    ])
  }
}
</script>

<style lang="less" scoped>
@import url('./../../style/variables.less');

.guide {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: @coverBackground;
  .cover {
    width: 33.33%;
    height: 100%;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    .top {
      width: 100%;
      flex: 1;
      border-right: thin dashed @borderColor;
    }
    .center {
      width: 100%;
      flex: 4;
      background: @coverBackgroundLight;
      border: thin dashed @borderColor;
    }
    .bottom {
      width: 100%;
      flex: 1;
      border-left: thin dashed @borderColor;
    }
  }
  .prompt-wrapper {
    width: 100%;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    color: @secondFontColor;
    font-size: 0.65rem;
    .go-prev,
    .show-user-menu,
    .go-next {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      > img {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
    .go-prev {
      > img {
        transform: rotate(-30deg);
        transform-origin: 0 50%;
      }
    }
    .show-user-menu {
      > img {
        margin-top: -0.6rem;
        margin-bottom: 0.6rem;
      }
    }
    .go-next {
      > img {
        transform: rotate(30deg);
        transform-origin: 120% 50%;
      }
    }
  }
}
.night-mode {
  .guide {
    background: @coverBackgroundNight;
    .cover {
      .top {
        border-right-color: @borderColorNight;
      }
      .center {
        background: @coverBackgroundLightNight;
        border-color: @borderColorNight;
      }
      .bottom {
        border-left-color: @borderColorNight;
      }
    }
    .prompt {
      color: @secondFontColorNight;
    }
  }
}
</style>
