<template>
  <div
    class="app"
    :class="{ 'night-mode': nightMode }"
    :style="{
        background: nightMode ? nightModeBackgroundColor : backgroundColor,
        color: nightMode ? nightModeFontColor : dayModeFontColor
      }"
  >
    <MainBody v-show="!(loadingShow || errorShow)" />
    <UserMenu v-show="userMenuShow" />
    <Catalog v-show="catalogChaptersShow || catalogBookmarksShow" />
    <MoreSetting v-show="moreSettingShow" />
    <Loading v-show="loadingShow" />
    <Error v-show="errorShow" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { debounce } from './utils/tools'
import {
  nightModeBackgroundColor,
  nightModeFontColor,
  dayModeFontColor
} from './utils/consts'
import MainBody from './components/mainBody/MainBody'
import UserMenu from './components/userMenu/UserMenu'
import Catalog from './components/catalog/Catalog'
import MoreSetting from './components/moreSetting/MoreSetting'
import Loading from './components/prompts/Loading'
import Error from './components/prompts/Error'

export default {
  name: 'App',
  components: {
    MainBody,
    UserMenu,
    Catalog,
    MoreSetting,
    Loading,
    Error
  },
  computed: {
    ...mapState({
      backgroundColor: state => state.userConfig.backgroundColor,
      nightMode: state => state.userConfig.nightMode,
      userMenuShow: state => state.showState.userMenuShow,
      catalogChaptersShow: state => state.showState.catalogChaptersShow,
      catalogBookmarksShow: state => state.showState.catalogBookmarksShow,
      moreSettingShow: state => state.showState.moreSettingShow,
      loadingShow: state => state.showState.loadingShow,
      errorShow: state => state.showState.errorShow
    })
  },
  data () {
    return {
      nightModeBackgroundColor,
      nightModeFontColor,
      dayModeFontColor
    }
  },
  methods: {
    ...mapMutations(['setDeviceSize']),
    ...mapActions(['initStore']),
    /**
     * 更新设备尺寸
     */
    updateDeviceSize () {
      const { documentElement } = document
      const boundingClientRect = documentElement.getBoundingClientRect()
      this.setDeviceSize(boundingClientRect)
      const fontSize = boundingClientRect.width / 10.8
      this.updateHTMLFontSize(fontSize)
    },
    /**
     * 更新 HTML 节点 font-size 属性
     * @param {Number} fontSize 字体大小属性
     */
    updateHTMLFontSize (fontSize) {
      const { documentElement } = document
      let style = documentElement.getAttribute('style')
      if (style === null) {
        documentElement.setAttribute('style', `font-size: ${fontSize}px`)
      } else {
        if (/font-size:/.test(style)) {
          style = style.replace(/font-size:[ \d.]+px/, `font-size: ${fontSize}px`)
          documentElement.setAttribute('style', style)
        } else {
          documentElement.setAttribute('style', `font-size: ${fontSize}px; ${style}`)
        }
      }
    }
  },
  mounted () {
    this.initStore()
    this.updateDeviceSize()
    window.onresize = debounce(this, this.updateDeviceSize)
  }
}
</script>

<style lang="less">
@import url('./style/style.less');

.app {
  position: fixed;
  left: 0;
  right: 0;
  .night-mode-item {
    display: none;
  }
  .active-item {
    display: none;
  }
  .active {
    .inactive-item {
      display: none;
    }
    .active-item {
      display: block;
    }
    .night-mode-item {
      display: none;
    }
  }
  &.night-mode {
    .day-mode-item {
      display: none;
    }
    .night-mode-item {
      display: block;
    }
    .active-item {
      display: none;
    }
    .active {
      .inactive-item {
        display: none;
      }
      .active-item {
        display: block;
      }
      .day-mode-item {
        display: none;
      }
    }
  }
}
</style>
