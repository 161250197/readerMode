<template>
  <div>
    Hello world {{count}}
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { api } from './apis/api'

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
    setHTMLFontSize () {
      const documentElement = document.documentElement
      const fontSize = documentElement.getBoundingClientRect().width / 10.8
      let style = documentElement.getAttribute('style') || ''
      documentElement.setAttribute('style', `font-size: ${fontSize}px; ${style}`)
    }
  },
  mounted () {
    this.setHTMLFontSize()
    this.add()
    document.onclick = async () => {
      this.add()
      console.log(await api.getNovelSources('domain', '元尊', '天蚕土豆'))
    }
  }
}
</script>
