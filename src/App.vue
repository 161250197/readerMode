<template>
  <div>
    Hello world {{count}}
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { api } from './apis/api'
import { debounce } from './utils/tools'

export default {
  name: 'App',
  computed: {
    ...mapState({
      count: state => state.count
    })
  },
  methods: {
    ...mapMutations({
      add: 'increment'
    }),
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
    this.updateHTMLFontSize()
    window.onresize = debounce(this, this.updateHTMLFontSize)
    this.add()
    document.onclick = async () => {
      this.add()
      console.log(await api.getNovelSources('domain', '元尊', '天蚕土豆'))
    }
  }
}
</script>
