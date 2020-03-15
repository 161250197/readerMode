<template>
  <div
    class="main-body-wrapper"
    @click.stop="onMainBodyClick"
  >
    <UpDown v-if="readerMode === readerModeUpDown" />
    <LeftRight v-else-if="readerMode === readerModeLeftRight" />
    <ErrorDiv
      v-else
      :retryCallback="resetReaderMode"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import UpDown from './components/UpDown'
import LeftRight from './components/LeftRight'
import ErrorDiv from './../utils/ErrorDiv'

const { readerModeUpDown, readerModeLeftRight } = require('./../../utils/consts.js').default

export default {
  name: 'MainBody',
  components: {
    UpDown,
    LeftRight,
    ErrorDiv
  },
  computed: {
    ...mapState({
      readerMode: state => state.userConfig.readerMode
    })
  },
  data () {
    return {
      readerModeUpDown,
      readerModeLeftRight
    }
  },
  methods: {
    ...mapMutations([
      'setReaderMode',
      'setCatalogShow'
    ]),
    /**
     * 响应主页点击
     * @param {MouseEvent} e
     */
    onMainBodyClick (e) {
      // TODO 具体响应处理
      console.log(e)
      this.showCatalog()
    },
    /**
     * 显示目录栏
     */
    showCatalog () {
      this.setCatalogShow(true)
    },
    /**
     * 重置阅读模式
     */
    resetReaderMode () {
      this.setReaderMode(readerModeUpDown)
    }
  }
}
</script>

<style lang="less" scoped>
.main-body-wrapper {
  height: 100%;
  overflow-y: scroll;
  position: fixed;
  left: 0;
  top: 0;
}
</style>
