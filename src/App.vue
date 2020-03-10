<template>
  <div class="app" :class="{'night-mode': nightMode}">
    <MainBody />
    <UserMenu />
    <Catalog />
    <MoreSetting />
    <Loading />
    <Error />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { debounce } from './utils/tools'
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
      nightMode: state => state.userConfig.nightMode
    })
  },
  methods: {
    ...mapActions(['setupStore']),
    /**
     * 更新 HTML 节点 font-size 属性
     */
    updateHTMLFontSize () {
      const documentElement = document.documentElement
      const fontSize = documentElement.getBoundingClientRect().width / 10.8
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
    this.setupStore()
    this.updateHTMLFontSize()
    window.onresize = debounce(this, this.updateHTMLFontSize)
  }
}
</script>

<style lang="less">

</style>
